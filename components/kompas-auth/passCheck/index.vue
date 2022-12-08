<template>
  <div class="strengthBar" :class="passwordClass"></div>
</template>

<script>
import { checkStrength, scorePassword } from '../../utils/password'
export default {
  name: 'PassCheck',
  props: {
    password: String,
  },
  computed: {
    passwordClass() {
      if (!this.password) {
        return null
      }
      const strength = checkStrength(this.password)
      const score = scorePassword(this.password)
      this.$emit('score', { score, strength })
      return {
        [strength]: true,
        scored: true,
      }
    },
  },
}
</script>

<style>
.strengthBar {
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 5px;
  margin-top: 8px;
}

.strengthBar.risky,
.strengthBar.guessable {
  background-color: #d00d12;
}
.strengthBar.weak,
.strengthBar.safe {
  background-color: #ff7a00;
}
.strengthBar.secure {
  background-color: #50a718;
}
</style>
