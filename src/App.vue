<script setup lang="ts">
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import { useSettingsStore } from '@/stores/settingsStore';

const dataStore = useDataStore();
const settingsStore = useSettingsStore(); 

onMounted(() => {
  dataStore.initData();
  settingsStore.init(); 
});
</script>

<template>
  <RouterView />
</template>