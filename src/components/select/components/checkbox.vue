<script setup>
import { ElCheckbox } from 'element-plus';
import { defineProps } from 'vue';
const innerModal = defineModel();

const props = defineProps();
console.log('props ==>', props);
</script>

<template>
  <ElCheckbox v-model="innerModal" v-bind="props"></ElCheckbox>
</template>

<style scoped lang="scss"></style>
