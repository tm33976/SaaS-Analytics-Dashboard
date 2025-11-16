<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore';
import MonthlySalesChart from '@/components/charts/MonthlySalesChart.vue';
import DeviceDonutChart from '@/components/charts/DeviceDonutChart.vue';

const store = useDataStore();
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">A deeper dive into your data.</p>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Bar Chart (Takes 2 columns) -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
        <MonthlySalesChart :chartInput="store.salesByMonth" />
      </div>
      
      <!-- Donut Chart (Takes 1 column) -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Breakdown</h3>
        <DeviceDonutChart />
      </div>

    </div>
  </div>
</template>