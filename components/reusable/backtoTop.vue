<template>
  <div v-show="visible" class="cursor-pointer fixed bottom-10 right-5 text-center w-20" @click="backToTop">
    <p class="bg-blue-royal-10 text-blue-royal-60 rounded shadow-lg w-10 h-10 p-2 mx-auto mb-3">
      <font-awesome-icon class="text-lg" :icon="['fas', 'chevron-up']" />
    </p>
    <p class="text-blue-royal-60 font-bold text-base">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      text: 'Kembali ke Atas',
      visibleoffset: 2560,
      visibleoffsetbottom: 0,
    }
  },
  mounted() {
    window.smoothscroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  methods: {
    // Catch window scroll event
    catchScroll() {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
    },
    // The function back to top
    backToTop() {
      window.smoothscroll()
    },
  },
}
</script>
