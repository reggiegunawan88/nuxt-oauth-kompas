<template>
  <!-- Show snackbar using Vuex for indicator -->
  <transition name="slide" mode="in-out">
    <div v-if="$store.state.snackbar.showSnackbarError" class="fixed w-full justify-items-center z-50 pt-13">
      <div class="flex w-full pt-3 justify-center">
        <div class="flex w-full max-w-md items-center justify-between bg-red-10 rounded-md shadow-md mx-4">
          <!-- icons -->
          <div class="p-4 items-center">
            <font-awesome-icon class="text-xl ml-3 text-red-50" :icon="['fas', 'exclamation-circle']" />
          </div>
          <!-- message -->
          <div class="flex flex-col w-full text-customTextColor py-2 font-sans font-bold">
            <p v-if="$store.state.snackbar.snackbarErrorTitle" class="text-base font-bold mb-1 text-left">{{ $store.state.snackbar.snackbarErrorTitle }}</p>
            <p class="text-sm text-left">{{ $store.state.snackbar.snackbarErrorDesc }}</p>
          </div>
          <!-- close btn -->
          <div class="p-4">
            <button class="focus:outline-none" @click="$store.dispatch('snackbar/hideSnackbarError')">
              <font-awesome-icon class="text-customTextColor text-xl opacity-50" :icon="['fas', 'times']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
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
