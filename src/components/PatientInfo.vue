<script setup lang="ts">
import { ref } from 'vue'

const patientInfo = ref({
  name: '',
  cardId: '',
  age: '',
  gender: '男',
  hasDentalMarks: false,
  hasThickCoating: false,
  department: '',
  examDate: '',
  hasSpinalDeformity: false,
  hasEcchymosis: false,
  conclusion: ''
})
</script>

<template>
  <div class="space-y-4">
    <el-form label-position="top">
      <el-form-item label="姓名">
        <el-input v-model="patientInfo.name" />
      </el-form-item>
      
      <el-form-item label="就诊卡ID">
        <el-input v-model="patientInfo.cardId" />
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="patientInfo.age" />
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="patientInfo.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="patientInfo.hasDentalMarks">是否有齿痕</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="patientInfo.hasThickCoating">舌苔是否厚腻</el-checkbox>
      </el-form-item>

      <el-form-item label="检查科室">
        <el-input v-model="patientInfo.department" />
      </el-form-item>

      <el-form-item label="检查日期">
        <el-date-picker 
          v-model="patientInfo.examDate"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="patientInfo.hasSpinalDeformity">脊柱性变</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="patientInfo.hasEcchymosis">舌头是否有瘀斑</el-checkbox>
      </el-form-item>

      <el-form-item label="结论">
        <el-input 
          v-model="patientInfo.conclusion"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>
  </div>
</template>