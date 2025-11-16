import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const profile = ref({
    name: 'Admin User',
    email: 'admin@example.com',
  })
  const isMobileSidebarOpen = ref(false)
  const init = () => {
    const storedProfile = localStorage.getItem('saas_dashboard_profile')
    if (storedProfile) {
      profile.value = JSON.parse(storedProfile)
    }
  }

  watch(
    profile,
    (newProfile) => {
      localStorage.setItem('saas_dashboard_profile', JSON.stringify(newProfile))
    },
    { deep: true },
  )

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  return {
    profile,
    isMobileSidebarOpen,
    init,
    toggleMobileSidebar,
  }
})
