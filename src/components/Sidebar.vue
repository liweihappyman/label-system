<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const selectedDay = ref(new Date().getDate())

// Generate year options (current year and 4 years back)
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => currentYear - i)
})

// Generate month options (1-12)
const months = computed(() => {
  return Array.from({ length: 12 }, (_, i) => i + 1)
})

// Generate day options (1-31, adjusting for month)
const days = computed(() => {
  const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
})

// When month changes, adjust day if necessary
const handleMonthChange = () => {
  const maxDays = new Date(selectedYear.value, selectedMonth.value, 0).getDate()
  if (selectedDay.value > maxDays) {
    selectedDay.value = maxDays
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-4">患者列表</h2>
    
    <!-- Date Selection -->
    <div class="space-y-4 mb-6">
      <div class="flex flex-col space-y-2">
        <label class="text-sm text-gray-600">年份</label>
        <el-select 
          v-model="selectedYear" 
          class="w-full"
          size="large"
        >
          <el-option
            v-for="year in years"
            :key="year"
            :label="year + '年'"
            :value="year"
          />
        </el-select>
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-sm text-gray-600">月份</label>
        <el-select 
          v-model="selectedMonth" 
          class="w-full"
          size="large"
          @change="handleMonthChange"
        >
          <el-option
            v-for="month in months"
            :key="month"
            :label="`${month}月`"
            :value="month"
          />
        </el-select>
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-sm text-gray-600">日期</label>
        <el-select 
          v-model="selectedDay" 
          class="w-full"
          size="large"
        >
          <el-option
            v-for="day in days"
            :key="day"
            :label="`${day}日`"
            :value="day"
          />
        </el-select>
      </div>
    </div>

    <!-- Patient List -->
    <div class="mt-4">
      <h3 class="text-sm font-medium text-gray-600 mb-2">当日患者</h3>
      <el-menu class="border rounded-lg">
        <el-menu-item index="1">
          <el-icon><User /></el-icon>
          <span>张三 - 20240220</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><User /></el-icon>
          <span>李四 - 20240220</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>