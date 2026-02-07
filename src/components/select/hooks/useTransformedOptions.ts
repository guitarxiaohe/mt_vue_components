import { computed } from 'vue';
import type { Option, UseSelectOptionsProps } from '../type';

/**
 * @description 合理转化
 * @param props
 * @param defaultValue
 * @returns
 */
export function useSelectOptions<T extends string | number>(
  props: UseSelectOptionsProps,
  defaultValue?: T
) {
  const transformedOptions = computed<Option[]>(() => {
    if (!Array.isArray(props.options) || props.options.length === 0) {
      return [];
    }

    return props.options
      .filter((item) => {
        return item && item[props.config.fieldLabel] !== undefined;
      })
      .map((item) => {
        const labelValue = item[props.config.fieldLabel];
        const value = item[props.config.fieldValue];
        const subheading = props.config.subheading
          ? item[props.config.subheading]
          : undefined;

        return {
          ...item,
          subheading,
          label:
            typeof labelValue === 'string'
              ? labelValue
              : String(labelValue || '未知'),
          value: value as T,
          disabled: item.disabled || false,
        };
      });
  });
  // 默认选项（当props.options为空时使用）
  const defaultOptions = computed(() => [
    { label: '选项1', value: '1' as T },
    { label: '选项2', value: '2' as T },
    { label: '选项3', value: '3' as T },
  ]);

  const list =
    transformedOptions.value.length > 0
      ? transformedOptions.value
      : defaultOptions.value;

  return {
    transformedOptions,
    defaultOptions,
    defaultValue,
    list,
    //    shouldUseDefaultOptions,
    //    getOptionByValue,
    //    getAllValues,
    //    searchOptions,
  };
}
