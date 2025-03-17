import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null as any
  }),

  actions: {
    setLoginState(state: boolean) {
      this.isLoggedIn = state
    },

    setUserInfo(info: any) {
      this.userInfo = info
    },

    logout() {
      this.isLoggedIn = false
      this.userInfo = null
      localStorage.removeItem('isLoggedIn')
    }
  }
})
