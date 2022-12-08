<template src="./template.html"></template>
<script lang="ts" src="./script.ts"></script>
<style scoped>
/* custom style for dropdown select arrow */
select {
  -webkit-appearance: none;
  appearance: none;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '\f107'; /* chevron-down */
  font-family: 'FontAwesome';
  font-weight: bold;
  font-size: 1rem;
  padding: 16px 4px 4px 0;
  top: 0;
  right: 10px;
  position: absolute;
  z-index: -1;
}
</style>
