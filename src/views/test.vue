<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<Props>(), {
  modelValue: {
    type: [String, Number],
    default: '',
  },
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

const showMoreOptions = () => {
  console.log('点击了更多按钮');
  // 这里可以打开弹窗、显示更多选项等
};
</script>

<template>
  <div class="ayc-select">
    <div class="select-with-btn">
      <el-select v-model="value" placeholder="请选择" class="custom-select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button link type="primary" class="more-btn" @click="showMoreOptions">
        ...
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ayc-select {
  .select-with-btn {
    position: relative;
    display: inline-block;

    .custom-select {
      width: 200px;

      :deep(.el-select__wrapper) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }
    }

    .more-btn {
      position: absolute;
      right: -40px; // 调整位置
      top: 0;
      height: 100%;
      width: 40px;
      padding: 0;
      border: 1px solid var(--el-border-color);
      border-left: none;
      border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base)
        0;

      &:hover {
        background: #f5f7fa;
      }
    }
  }
}
</style>
