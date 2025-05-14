<script setup lang="ts">
import { ref } from 'vue'

const patientInfo = ref({
  name: '',
  cardId: '',
  height: '',
  weight: '',
  age: '',
  gender: '男',
  hasDentalMarks: false,
  hasThickCoating: false,
  department: '',
  examDate: '',
  hasSpinalDeformity: false,
  hasEcchymosis: false,
  conclusion: '针对红外热成像（MIT）在失眠障碍（ID）辅助诊断中存在的特征特异性低、个体差异性大等技术难点，本研究提出了一种基于改进MobileViT的轻量化辅助诊断模型MRI-MobileViT。通过构建包含5000余例临床复杂样本的数据集（涵盖“非失眠-失眠”二分类），解决了传统PSG检测成本高、操作复杂的问题。为提高模型对头部区域温度细微差异的敏感性，本研究通过引入CoordAtt注意力机制优化MV2模块的空间-通道特征交互能力，并采用RepViT模块实现训练与推理阶段的结构重参数化。此外，提出SAM-Adam协同优化策略，通过梯度平坦化与解耦权重衰减提升模型在数据分布偏移场景下的泛化性能。实验结果表明，MRI-MobileViT在测试集上的失眠检测准确率达94.85%，平均F1分数为91.86%，参数量仅为0.95M，计算量低至0.26GFLOPs。消融实验验证了注意力机制与双优化器对模型性能的显著提升作用。本模型为失眠的临床筛查提供了无创、高效的辅助工具，其轻量化特性适配于基层医疗机构的硬件条件。未来可通过多中心数据联合训练进一步优化模型的泛化能力。'
})
</script>

<template>
  <div class="space-y-4">
    <el-form label-position="left">
      <div style="display: flex; gap: 48px">
        <el-form-item label="姓名">
          <el-input v-model="patientInfo.name" />
        </el-form-item>

        <el-form-item label="就诊卡ID">
          <el-input v-model="patientInfo.cardId" />
        </el-form-item>
      </div>

      <div style="display: flex; gap: 47px">
        <el-form-item label="年龄">
          <el-input v-model="patientInfo.age" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="patientInfo.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div style="display: flex; gap: 48px">
        <el-form-item label="身高(cm)">
          <el-input v-model="patientInfo.height" />
        </el-form-item>

        <el-form-item label="体重(kg)">
          <el-input v-model="patientInfo.weight" />
        </el-form-item>
      </div>

      <el-form-item label="检查科室" style="width: 50%">
        <el-select v-model="patientInfo.department" placeholder="请选择科室">
          <el-option label="内科" value="内科" />
          <el-option label="外科" value="外科" />
          <el-option label="中医科" value="中医科" />
          <el-option label="针灸科" value="针灸科" />
          <el-option label="推拿科" value="推拿科" />
        </el-select>
      </el-form-item>

      <el-form-item label="检查日期">
        <el-date-picker v-model="patientInfo.examDate" type="date" placeholder="选择日期" />
      </el-form-item>

      <div style="display: flex; gap: 48px">
        <el-form-item>
          <el-checkbox v-model="patientInfo.hasDentalMarks">是否有齿痕</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="patientInfo.hasThickCoating">舌苔是否厚腻</el-checkbox>
        </el-form-item>
      </div>

      <div style="display: flex; gap: 48px">
        <el-form-item>
          <el-checkbox v-model="patientInfo.hasSpinalDeformity">脊柱性变</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="patientInfo.hasEcchymosis">舌头是否有瘀斑</el-checkbox>
        </el-form-item>
      </div>

      <el-form-item>
        <div style="margin-bottom: 8px">结论</div>
        <el-input v-model="patientInfo.conclusion" type="textarea" :rows="16" readonly />
      </el-form-item>
    </el-form>
  </div>
</template>