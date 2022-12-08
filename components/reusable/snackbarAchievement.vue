<template>
  <!-- Show snackbar using Vuex for indicator -->
  <transition name="slide" mode="in-out">
    <div v-if="$store.state.snackbar.showSnackbarAchievement" class="fixed w-full justify-items-center z-50 pt-13">
      <div class="flex w-full pt-3 justify-center">
        <div class="flex w-full max-w-md items-start justify-between bg-white rounded-md shadow-md mx-4 py-3 px-5">
          <!-- icons -->
          <div class="items-center pr-4">
            <img :src="$store.state.snackbar.snackbarAchievementIcon" alt="Achievement icon" />
          </div>
          <!-- message -->
          <div class="flex flex-col w-full text-customTextColor py-2 font-sans">
            <p class="text-sm font-bold mb-1 text-left">{{ $store.state.snackbar.snackbarAchievementTitle }}</p>
            <p class="text-xs text-left mb-3">{{ $store.state.snackbar.snackbarAchievementDesc }}</p>
            <NuxtLink class="text-xs text-blue-royal-60 font-bold" to="/manage-account/reader-achievement">Lihat Medali</NuxtLink>
          </div>
          <!-- close btn -->
          <div class="pl-4">
            <button class="focus:outline-none" @click="$store.dispatch('snackbar/showSnackbarAchievement', false)">
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
