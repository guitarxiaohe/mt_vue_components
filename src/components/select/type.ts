import { Column, SelectInstance } from 'element-plus';

export interface Props<T> {
  modelValue?: T;

  options: Option[];

  config: SelectInstance | Config;

  dialogConfig: DialogConfig;

  tableConfig: TableConfig;

  column: Column[];
}
export interface Option {
  [key: string]: any;
}

export interface Config {
  fieldLabel: string;
  fieldValue: string;

  subheading?: string;
}

export interface DialogConfig {
  width: string;

  title: string;
}

export interface UseSelectOptionsConfig {
  fieldLabel: string;
  fieldValue: string;
  subheading?: string;
}

export interface UseSelectOptionsProps {
  options: any[];
  config: UseSelectOptionsConfig;
  multiple?: boolean;
}

export interface TableConfig {}
