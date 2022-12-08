<template>
  <div />
</template>
<script>
export default {
  middleware({ app, $config, redirect }) {
    if (process.server) {
      redirect($config.homepageKompasAuth)
    }
  },
}
</script>
