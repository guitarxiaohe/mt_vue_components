<script setup>
import { XhSelect, FileUpload } from './components/index';
import { ref, watch } from 'vue';
const column = ref([
  {
    title: 'test',
    width: 200,
    key: 'label',
  },
  {
    title: 'test1',
    width: 200,
    key: 'value',
  },
  {
    title: 'test1',
    key: 'value',
    width: 200,
  },
  {
    title: 'test12',
    key: 'value',
  },
  {
    title: 'test13',
    key: 'value',
  },
  {
    title: 'test21',
    key: 'value',
  },
]);

const values = ref();

watch(values, (val) => {
  console.log('val ==>', val);
});
</script>

<template>
  <XhSelect v-model="values" :column="column"> </XhSelect>

  <FileUpload />
</template>
<style scoped lang="scss"></style>
