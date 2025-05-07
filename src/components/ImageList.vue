<template>
  <div class="p-4">
    <el-scrollbar>
      <div class="flex space-x-4">
        <div v-for="i in 10" :key="i" class="flex-shrink-0">
          <el-image
            style="width: 100px; height: 100px"
            src="https://placeholder.co/100"
            fit="cover"
            class="rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>