<script setup lang="ts">
// 定义props，接收从父组件传递过来的图片列表
const props = defineProps<{
  images: string[]
}>()

// 定义组件发出的事件
const emit = defineEmits(['image-selected'])

/**
 * 处理图片选择事件
 * @param {string} imageSrc - 被选中图片的路径
 */
function selectImage(imageSrc: string) {
  // 向父组件发出image-selected事件并传递图片路径
  emit('image-selected', imageSrc)
}
</script>
<template>
  <div class="p-4">
    <el-scrollbar>
      <div class="flex space-x-4">
        <div v-for="i in props.images.length" :key="i" class="flex-shrink-0 h-60 flex justify-center items-center ml-0.5">
          <div class="flex flex-col items-center">
            <el-image
              style="width: 114px; height: 157px"
              :src="props.images[i-1]"
              fit="cover"
              class="rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
              @click="selectImage(props.images[i-1])"
            />
            <div class="text-center mt-1">ID: {{ i }}</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>