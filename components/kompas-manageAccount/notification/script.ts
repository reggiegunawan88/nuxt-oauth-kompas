import moment from 'moment'
import Vue from 'vue'
import { convertUNIXDate } from '~/components/utils/helper/date'
export default Vue.extend({
  data() {
    return {
      dataLoaded: false,
      isLoading: false,
    }
  },
  computed: {
    notificationList() {
      return this.$store.state.kelolaAkun.userNotification.list
    },
    nextNotification() {
      return this.$store.state.kelolaAkun.userNotification.next
    },
    notificationLoading() {
      return this.$store.state.kelolaAkun.userNotification.isLoading
    },
    showLoadMore() {
      return this.$store.state.kelolaAkun.userNotification.loadMore
    },
  },
  watch: {
    notificationList() {
      this.isLoading = false
      this.handleDataLoad()
    },
  },
  mounted() {
    this.handleDataLoad()
  },
  methods: {
    handleDataLoad() {
      if (!this.notificationLoading) {
        this.dataLoaded = true
      }
    },
    convertTimestamp(data: string) {
      // convert date time to unix format
      const unix = moment(data).unix()
      const unixString = unix.toString()

      return convertUNIXDate(unixString)
    },
    async handleIsRead(id: any, isRead: any, link: any) {
      // redirect to endpoint
      if (link) {
        window.open(
          link,
          '_blank', // <- This is what makes it open in a new window.
        )
      }
      // Set notification is read
      if (!isRead) {
        const response = await this.$store.dispatch('kelolaAkun/userNotificationIsRead', id)
        if (response.data.success) {
          this.$store.dispatch('kelolaAkun/isNotificationRead', id)
        }
      }
    },
    loadMore() {
      this.isLoading = true
      this.$store.dispatch('kelolaAkun/getUserNotification', { next: this.nextNotification })
    },
  },
})