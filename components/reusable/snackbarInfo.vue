<template>
  <!-- Show snackbar using Vuex for indicator -->
  <transition name="slide" mode="in-out">
    <div v-if="$store.state.snackbar.showSnackbarInfo" class="fixed w-full justify-items-center z-50 pt-13">
      <div class="flex w-full pt-3 justify-center">
        <div class="flex w-full max-w-md items-center justify-between bg-blue-royal-10 rounded-md shadow-md mx-4 py-3 px-5">
          <!-- icons -->
          <div class="items-center pr-4">
            <font-awesome-icon class="text-xl text-brand-1" :icon="['fas', 'info-circle']" />
          </div>
          <!-- message -->
          <div class="flex flex-col w-full text-customTextColor font-sans">
            <p class="text-sm font-bold text-left">
              {{ $store.state.snackbar.snackbarInfoDesc }}
            </p>
          </div>
          <!-- close btn -->
          <div class="pl-4">
            <button class="focus:outline-none" @click="$store.dispatch('snackbar/showSnackbarInfo', false)">
              <font-awesome-icon class="text-customTextColor text-xl opacity-50" :icon="['fas', 'times']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
/* snackbar custom msg from Vuex store */
</script>
<style scoped>
.slide-enter-active {
  animation: slide-in 0.2s reverse;
}
.slide-leave-active {
  animation: slide-out 0.2s reverse;
}

@keyframes slide-in {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
