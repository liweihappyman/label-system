<script setup lang="ts">
import TopNavbar from './components/TopNavbar.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Top Navigation -->
    <TopNavbar />

    <!-- Router View to display route components -->
    <router-view class="flex-1"></router-view>
  </div>
</template>