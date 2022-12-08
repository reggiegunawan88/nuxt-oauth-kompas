<template src="./template.html"></template>
<script lang="ts" src="./script.ts"></script>
<style scoped>
/* custom styling for tooltip and its arrow */
.tooltip {
  position: absolute;
  background: #e1f0ff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
.tooltip:before {
  content: '';
  position: absolute;
  top: 25px;
  left: -20px;
  z-index: 1;
  border: solid 10px transparent;
  border-right-color: #e1f0ff;
}

@media (max-width: 480px) {
  .tooltip:before {
    content: '';
    position: absolute;
    top: -20px;
    left: 45%;
    z-index: 1;
    border: solid 10px transparent;
    border-bottom-color: #e1f0ff;
  }
}
</style>
