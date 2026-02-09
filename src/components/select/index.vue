<script setup lang="ts" generic="T extends string | Array<string>">
import { ref, useSlots } from 'vue';
import type { Props } from './type';
import { useSelectOptions } from './hooks/useTransformedOptions';
import { useTableList } from './hooks/useTableList';

const props = withDefaults(defineProps<Props<T>>(), {
  multiple: false,
  filterable: true,
  column: () => [],
  options: () => [],
  dialogConfig: () => ({
    width: '1000px',
    title: '查询列表',
  }),

  tableConfig: () => ({ width: 1000, height: 500, keyId: 'value' }),
  config: () => ({
    fieldLabel: 'label',
    fieldValue: 'value',
    filterable: true,
    disabled: false,
  }),
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void;
  (e: 'more-click'): void;
}>();

const dialogValue = ref(false);
const innerValue = defineModel<T | undefined>();
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
const { columns, getTableSelect } = useTableList(
  props.column,
  props.tableConfig,
  (e) => {
    console.log(e);
  }
);
console.log('getTableSelect ==>', getTableSelect());
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
      <el-select-v2
        v-model="innerValue"
        :options="list"
        v-bind="config"
        class="custom-select"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </el-select-v2>
      <el-button
        v-if="!disabled"
        link
        type="primary"
        class="more-btn"
        @click="showMoreOptions"
      >
        ...
      </el-button>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="dialogValue" v-bind="props.dialogConfig">
      <div class="select-table">
        <el-auto-resizer>
          <el-table-v2
            :columns="columns"
            :data="list"
            v-bind="props.tableConfig"
            fixed
          />
        </el-auto-resizer>
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
