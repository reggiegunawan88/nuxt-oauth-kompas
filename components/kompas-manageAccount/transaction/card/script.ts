import Vue from 'vue'
import { currency, orderStatus, orderStatusStyle } from '~/components/utils/helper/general'
import { reformDateWithMonthName } from '~/components/utils/helper/date'
export default Vue.extend({
  props: ['item'],
  methods: {
    reformDateWithMonthName,
    currency,
    orderStatus,
    orderStatusStyle,
    imagePlaceholder(event: any) {
      event.target.src = require('~/assets/kompas-blue-icon.png')
    },
  },
})
