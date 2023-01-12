import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserAuthStore = defineStore('user', {
  state: () => {
    return {
      user: ref({})
    }
  },
  actions: {
    userLogin(username, email, bearer) {
      this.user.username = username
      this.user.email = email
      this.user.bearer = bearer
    },
    userLogout() {
      localStorage.removeItem("user")
    }
  },
  persist: true
}
)