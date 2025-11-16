<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <header
    class="sticky top-0 z-20 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <!-- Left: Mobile Menu Trigger & Page Title -->
    <div class="flex items-center gap-4">
      <button
        @click="settingsStore.toggleMobileSidebar"
        class="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-semibold text-gray-900 dark:text-white capitalize">
        {{ $route.name?.toString().replace('-', ' ') }}
      </h1>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-4">
      <DateRangeFilter />
    </div>
  </header>
</template>