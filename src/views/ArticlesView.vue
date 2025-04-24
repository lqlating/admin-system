<template>
  <div class="articles-container">
    <h2>文章管理</h2>
    <DataList :pending-data="articleList" :reported-data="reportedArticles" :normal-data="bannedArticles"
      @row-click="handleRowClick">
      <template #default="{ row, activeTab }">
        <el-table-column prop="article_id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="author_name" label="作者" min-width="120" show-overflow-tooltip />
        <el-table-column prop="publication_time" label="发布时间" min-width="160" />
        <el-table-column label="状态" min-width="100">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.is_banned">
              已封禁
            </el-tag>
            <el-tag type="warning" v-else-if="scope.row.is_reported">
              被举报
            </el-tag>
            <el-tag type="info" v-else>
              待审核
            </el-tag>
          </template>
        </el-table-column>
        <!-- 只在被举报页面显示举报原因 -->
        <template v-if="activeTab === 'reported'">
          <el-table-column label="举报原因" min-width="150" show-overflow-tooltip>
            <template #default="scope">
              <span v-if="scope.row.report_reason">{{ scope.row.report_reason }}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <!-- 被举报文章显示忽略和封禁按钮 -->
            <template v-if="scope.row.is_reported && !scope.row.is_banned">
              <el-button size="small" type="success" @click.stop="handleIgnoreReport(scope.row)">
                忽略
              </el-button>
              <el-button size="small" type="danger" @click.stop="handleBan(scope.row.article_id)">
                封禁
              </el-button>
            </template>
            <!-- 未封禁且未举报文章显示通过和封禁按钮 -->
            <template v-else-if="!scope.row.is_banned && !scope.row.is_reported">
              <el-button size="small" type="success" @click.stop="handleApprove(scope.row.article_id)">
                通过
              </el-button>
              <el-button size="small" type="danger" @click.stop="handleBan(scope.row.article_id)">
                封禁
              </el-button>
            </template>
            <!-- 已封禁文章显示解封按钮 -->
            <template v-else>
              <el-button size="small" type="primary" @click.stop="handleUnban(scope.row.article_id)">
                解封
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </DataList>

    <!-- 文章详情弹窗 -->
    <transition name="fade">
      <div v-if="selectedArticle" class="article-detail-overlay" @click.self="closeArticleDetail">
        <article-inner :article="selectedArticle" :article_inner="true" :current-user-id="1"
          @close="closeArticleDetail" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DataList from '../components/DataList.vue'
import ArticleInner from '../components/article/article_inner.vue'
import { useArticlesStore } from '@/store/articles'
import type { Article } from '@/types/article'
import { ElMessage } from 'element-plus'
import reportApi from '@/api/modules/reportApi'
import articleApi from '@/api/modules/articleApi'

// 定义举报对象的接口
interface Report {
  report_id: number
  report_content_id: number
  report_reason: string
  reporter_id?: number
}

const articlesStore = useArticlesStore()
const { articleList, bannedArticles } = storeToRefs(articlesStore)
const { getPendingArticles, getBannedArticles, setReviewed, setReviewedAndBanned, unbanArticle } = articlesStore

const selectedArticle = ref<Article | null>(null)
const reportedArticles = ref<Article[]>([])

const handleRowClick = (row: Article) => {
  selectedArticle.value = row
}

const closeArticleDetail = () => {
  selectedArticle.value = null
}

const fetchData = async () => {
  try {
    await getPendingArticles()
    await getBannedArticles()
    console.log('待审核文章:', articleList.value)
    console.log('已封禁文章:', bannedArticles.value)

    // 获取被举报文章
    try {
      const reportedRes = await reportApi.getReportsByArticleType()
      console.log('文章举报数据 API 返回:', reportedRes)

      // 检查是否有数据
      if (reportedRes.data && reportedRes.data.data) {
        const reports = reportedRes.data.data as Report[]

        // 检查报告内容
        console.log('报告内容样例:', reports.length > 0 ? reports[0] : '无数据')

        // 获取被举报文章的详细信息
        const reportedArticlesDetails: Article[] = [];

        for (const report of reports) {
          if (!report.report_content_id) continue;

          // 检查文章ID是否已存在于被封禁列表中
          if (bannedArticles.value.some(banned => banned.article_id === report.report_content_id)) {
            continue; // 跳过已封禁的文章
          }

          try {
            // 获取文章详情
            const articleRes = await articleApi.getArticlesByIds([report.report_content_id]);
            if (articleRes.data?.data?.length > 0) {
              const articleDetail = articleRes.data.data[0];
              // 扩展文章对象以添加举报相关字段
              reportedArticlesDetails.push({
                ...articleDetail,
                is_reported: true,
                report_reason: report.report_reason,
                report_id: report.report_id
              } as Article);
            }
          } catch (error) {
            console.error(`获取文章ID=${report.report_content_id}详情失败:`, error);
          }
        }

        reportedArticles.value = reportedArticlesDetails;
        console.log('处理后的被举报文章:', reportedArticles.value)
      } else {
        reportedArticles.value = []
        console.log('没有文章举报数据')
      }
    } catch (error) {
      console.error('获取举报数据失败:', error)
      reportedArticles.value = []
    }

    // 过滤掉待审核文章中已封禁的文章
    articleList.value = articleList.value.filter(article => !article.is_banned)
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取文章失败')
  }
}

onMounted(fetchData)

const handleApprove = async (articleId: number) => {
  try {
    await setReviewed(articleId)
    ElMessage.success('审核通过成功')
    await fetchData()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleBan = async (articleId: number) => {
  try {
    await setReviewedAndBanned(articleId)
    ElMessage.success('封禁成功')
    await fetchData()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleUnban = async (articleId: number) => {
  try {
    await unbanArticle(articleId)
    ElMessage.success('解封成功')
    await fetchData()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleIgnoreReport = async (row: any) => {
  try {
    // 检查是否有report_id
    if (!row.report_id) {
      console.error('缺少举报ID:', row);
      ElMessage.warning('无法确定要忽略的举报ID');
      return;
    }

    console.log('忽略举报ID:', row.report_id);
    // 调用删除举报API
    const res = await reportApi.deleteReport(row.report_id);
    console.log('删除举报返回:', res);

    if (res.data && res.data.code === 1) {
      ElMessage.success('已忽略举报');
      // 从举报列表中移除该文章
      reportedArticles.value = reportedArticles.value.filter(
        article => article.report_id !== row.report_id
      );
    } else {
      throw new Error(res.data?.msg || '忽略举报失败');
    }
  } catch (error: any) {
    console.error('忽略举报失败:', error);
    ElMessage.error(`操作失败: ${error.message || '未知错误'}`);
  }
}
</script>

<style scoped>
.articles-container {
  min-height: calc(100vh - 40px);
  position: relative;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  position: relative;
  padding-left: 12px;
}

h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 4px;
  background-color: #409eff;
  border-radius: 2px;
}

:deep(.el-button) {
  margin: 0 4px;
}

:deep(.el-tag) {
  margin: 0 4px;
}

/* 文章详情遮罩层 */
.article-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>