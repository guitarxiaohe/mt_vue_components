import { Column, SelectInstance } from 'element-plus';
// 在文件顶部或类型定义文件中添加：
// type Merge<F, S> = {
//   [K in keyof F | keyof S]: K extends keyof S
//     ? S[K]
//     : K extends keyof F
//       ? F[K]
//       : never;
// };
export interface Props<T> {
  modelValue?: T;

  options: Option[];

  config: Config;
  // config: Merge<Config, SelectInstance>;

  dialogConfig: DialogConfig;

  tableConfig: TableConfig;

  column: Column[];

  multiple?: boolean;

  filterable?: boolean;

  disabled?: boolean;
}
export interface Option {
  [key: string]: any;
}

export interface Config {
  fieldLabel: string;
  fieldValue: string;

  subheading?: string;

  multiple?: boolean;

  filterable?: boolean;

  disabled?: boolean;
}

export interface DialogConfig {
  width: string;

  title: string;
}

export interface UseSelectOptionsConfig {
  fieldLabel: string;
  fieldValue: string;
  subheading?: string;

  filterable?: boolean;

  disabled?: boolean;
}

export interface UseSelectOptionsProps {
  options: any[];
  config: UseSelectOptionsConfig;
  multiple?: boolean;
}

export interface TableConfig {
  keyId: string;
}
