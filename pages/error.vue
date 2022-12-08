<template>
  <div />
</template>
<script>
export default {
  asyncData({ error, route }) {
    error({ statusCode: route.query.code })
  },
}
</script>
