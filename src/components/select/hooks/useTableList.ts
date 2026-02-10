import { Column } from 'element-plus';
import { TableConfig } from '../type';
import { h, ref, computed } from 'vue';
import TableCheckbox from '@/components/select/components/checkbox.vue';

interface Row {
  [key: string]: unknown;
  checked?: boolean;
}

interface Fn {
  selectIds: string[];
  selectRow: Row[];
}

// 使用 Map 同时存储 ID 和行数据，自动去重
const selectionMap = ref<Map<string, Row>>(new Map());

// 计算属性
const selectIds = computed(() => Array.from(selectionMap.value.keys()));
const selectRow = computed(() => Array.from(selectionMap.value.values()));

export const useTableList = (
  columns: Column[],
  tableConfig: TableConfig,
  fn?: (ids: Fn) => void
) => {
  // 切换选择
  const toggleRow = (row: Row) => {
    const id = String(row[tableConfig.keyId]);

    if (selectionMap.value.has(id)) {
      selectionMap.value.delete(id);
      row.checked = false;
    } else {
      selectionMap.value.set(id, row);
      row.checked = true;
    }

    fn?.({ selectIds: selectIds.value, selectRow: selectRow.value });
  };

  // 添加选择列
  columns.unshift({
    key: 'selection',
    width: 50,
    cellRenderer: ({ rowData, rowIndex }) => {
      console.log(rowIndex);

      const isChecked = selectionMap.value.has(
        String(rowData[tableConfig.keyId])
      );

      return h(TableCheckbox, {
        modelValue: isChecked,
        'onUpdate:modelValue': () => toggleRow(rowData),
        ariaLabel: '选择行',
        rowIndex,
      });
    },
  });

  // 格式化列
  const formattedColumns = columns.map((col) => ({
    ...col,
    width: col.width || 120,
    dataKey: col.key,
  }));

  return {
    columns: formattedColumns,
    selectIds: selectIds.value,
    getTableSelect: () => selectIds.value,
    toggleRow,
    clearSelection: () => {
      // 重置所有已选行的 checked 状态
      selectionMap.value.forEach((row) => {
        row.checked = false;
      });
      selectionMap.value.clear();
      fn?.({ selectIds: [], selectRow: [] });
    },
  };
};
