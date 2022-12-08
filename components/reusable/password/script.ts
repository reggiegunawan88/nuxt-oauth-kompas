import Vue from 'vue'
import { validateEmptyValue } from '~/components/utils/helper/stringManipulation'

export default Vue.extend({
  data() {
    return {
      /* all password data placed on Vuex */
      // show or hide btn
      showPassword: false,
    }
  },
  computed: {
    passwordValue: {
      get() {
        return this.$store.state.password.passwordValue
      },
      set(value) {
        this.$store.dispatch('password/setPasswordValue', value)
      },
    },
    score() {
      return this.$store.state.password.score
    },
    isPasswordEmpty() {
      return this.$store.state.password.isPasswordEmpty
    },
  },
  mounted() {
    this.$store.dispatch('password/setPasswordValue', '')
  },
  methods: {
    fillPassword(value: string): void {
      // validate if pass is empty
      this.$store.dispatch('password/isPasswordEmpty', validateEmptyValue(value))
    },
    onScore({ score }: any) {
      this.$store.dispatch('password/setPasswordScore', score)
    },
  },
})
