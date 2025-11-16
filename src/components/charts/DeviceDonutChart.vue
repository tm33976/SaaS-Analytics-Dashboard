<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData
} from 'chart.js';
import { computed } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend);

// We'll use hard-coded data for this example
const chartInput = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  data: [65, 25, 10],
};

const chartData = computed<ChartData<'doughnut'>>(() => {
  return {
    labels: chartInput.labels,
    datasets: [
      {
        data: chartInput.data,
        backgroundColor: ['#4f46e5', '#3b82f6', '#60a5fa'], 
        borderColor: 'transparent',
        hoverOffset: 4,
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', // This makes it a donut
  plugins: { 
    legend: { 
      position: 'right' as const,
      labels: {
        color: '#9ca3af', 
        boxWidth: 12,
        padding: 20,
      }
    } 
  },
};
</script>

<template>
  <div class="w-full h-[300px]">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>