import { Column } from 'element-plus';

export const useTableList = (columns: Column[]) => {
  const defaultColumns = [
    {
      title: 'test',
      key: 'label',
    },
    {
      title: 'test1',
      key: 'value',
    },
  ];
  return {
    columns: columns ?? defaultColumns,
  };
};
