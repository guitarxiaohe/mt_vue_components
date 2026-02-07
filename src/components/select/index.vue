<script setup lang="ts" generic="T extends string | Array<string>">
import { computed, ref, toRef, toRefs, watch } from 'vue';
import type { Props, Option } from './type';
import { useSelectOptions } from './hooks/useTransformedOptions';
import { useTableList } from './hooks/useTableList';
import { Column } from 'element-plus';

const props = withDefaults(defineProps<Props<T>>(), {
  modelValue: undefined,
  multiple: false,
  filterable: true,
  column: () => [],
  options: () => [],
  dialogConfig: () => ({
    width: '1000px',
    title: '查询列表',
  }),

  tableConfig: () => ({
    height: 500,
  }),
  config: () => ({
    fieldLabel: 'label',
    fieldValue: 'value',
    filterable: true,
  }),
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
  (e: 'more-click'): void;
}>();

const innerValue = ref<T | undefined>(props.modelValue);
const dialogValue = ref(false);

const { list } = useSelectOptions(
  {
    options: props.options,
    config: {
      fieldLabel: props.config.fieldLabel,
      fieldValue: props.config.fieldValue,
      subheading: props.config.subheading,
    },
  },
  ''
);
const { columns } = useTableList(props.column);

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);

const handleSelectChange = (value: T) => {
  innerValue.value = value;
  emit('update:modelValue', value);
};

// 右侧...点击弹框列表
const showMoreOptions = () => {
  dialogValue.value = true;
  console.log('点击了更多按钮');
  emit('more-click');
};
</script>

<template>
  <div class="ayc-select">
    <div class="select-with-btn">
      <el-select
        :model-value="innerValue"
        @update:model-value="handleSelectChange"
        placeholder="请选择"
        v-bind="config"
        class="custom-select"
      >
        <el-option
          v-for="item in list"
          :key="String(item.value)"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button link type="primary" class="more-btn" @click="showMoreOptions">
        ...
      </el-button>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogValue" v-bind="props.dialogConfig">
      <div class="select-table">
        <el-table-v2
          :columns="columns"
          :data="list"
          v-bind="props.tableConfig"
          fixed
        />
      </div>
    </el-dialog>
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
      right: -40px;
      top: 0;
      height: 100%;
      width: 40px;
      padding: 0;
      font-size: 16px;
      border: 1px solid var(--el-border-color);
      border-left: none;
      border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base)
        0;

      &:hover {
        background: #f5f7fa;
      }
    }
  }
  .select-table {
    overflow: auto;
  }
}
</style>
