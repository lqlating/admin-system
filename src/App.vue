<template>
  <div class="app-container">
    <el-container v-if="$route.path !== '/login'">
      <el-aside width="200px">
        <el-menu
          :router="true"
          class="sidebar-menu"
          default-active="books"
        >
          <el-menu-item index="/books">
            <el-icon>
              <DocumentIcon />
            </el-icon>
            <span>书籍管理</span>
          </el-menu-item>
          <el-menu-item index="/articles">
            <el-icon>
              <ReadingIcon />
            </el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/comments">
            <el-icon>
              <ChatLineRoundIcon />
            </el-icon>
            <span>评论管理</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon>
              <UserIcon />
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
        <div class="logout-button">
          <el-button type="text" @click="handleLogout">
            <el-icon>
              <SwitchButtonIcon />
            </el-icon>
            退出登录
          </el-button>
        </div>
      </el-aside>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script setup lang="ts">
import {
  Document as DocumentIcon,
  Reading as ReadingIcon,
  ChatLineRound as ChatLineRoundIcon,
  User as UserIcon,
  SwitchButton as SwitchButtonIcon
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
}

.el-container {
  width: 100%;
  height: 100%;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.el-aside {
  background-color: #304156;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  height: 100vh;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}

:deep(.el-menu) {
  border-right: none;
  background-color: #304156;
}

:deep(.el-menu-item) {
  color: #bfcbd9;
}

:deep(.el-menu-item.is-active) {
  color: #409eff;
  background-color: #263445;
}

:deep(.el-menu-item:hover) {
  color: #fff;
  background-color: #263445;
}

:deep(.el-menu-item .el-icon) {
  color: inherit;
  margin-right: 10px;
}

.logout-button {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.logout-button .el-button {
  color: #bfcbd9;
  width: 100%;
  text-align: left;
  padding-left: 20px;
}

.logout-button .el-button:hover {
  color: #fff;
}

.logout-button .el-icon {
  margin-right: 10px;
}
</style>
