<template>
  <!-- custom layout for onboarding auth page -->
  <div>
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: 'setToken',
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $route(to, from) {
      this.$gtm.push({ event: 'pageDetailsPushed' })
    },
  },
  mounted() {
    this.$gtm.push({ event: 'pageDetailsPushed' })
  },
})
</script>
