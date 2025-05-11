<template>
  <div class="p-4">
    <el-scrollbar>
      <div class="flex space-x-4">
        <div v-for="i in 7" :key="i" class="flex-shrink-0 h-60 flex justify-center items-center ml-0.5">
          <el-image
            style="width: 140px; height: 200px"
            src="src/assets/infraredImg.png"
            fit="cover"
            class="rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>