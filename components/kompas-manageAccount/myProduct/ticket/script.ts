import Vue from 'vue'
import { reformDateWithMonthName } from '~/components/utils/helper/date'
import { evenTicketStatus } from '~/components/utils/helper/general'

export default Vue.extend({
  data() {
    return {
      activeAccordion: null as any,
      sortValue: 'Semua Kategori',
      sortCategories: [{ name: 'Semua Kategori' }, { name: 'Telah Berakhir' }, { name: 'Event Berbayar' }, { name: 'Event Gratis' }],
      loadMoreLoading: false,
      dataLoaded: false,
      sortLoading: false,
    }
  },
  computed: {
    tickets() {
      return this.$store.state.myProduct.ticket.list
    },
    loadMore() {
      return this.$store.state.myProduct.ticket.loadMore
    },
    next() {
      return this.$store.state.myProduct.ticket.next
    },
    isLoading() {
      return this.$store.state.myProduct.ticket.isLoading
    },
  },
  watch: {
    tickets() {
      this.loadMoreLoading = false
      this.ticketList()
    },
  },
  mounted() {
    this.ticketList()
  },
  methods: {
    reformDateWithMonthName,
    ticketList() {
      if (!this.isLoading) {
        this.dataLoaded = true
      }
    },
    toggleDisplay(ticketId: any) {
      this.$store.dispatch('myProduct/toggleTicketDetail', ticketId)
    },
    async sortBy() {
      this.sortLoading = true
      const sort = evenTicketStatus(this.sortValue)
      await this.$store.dispatch('myProduct/getListEventTicket', { sort, next: '' })
      this.sortLoading = false
    },
    loadMoreAction() {
      this.loadMoreLoading = true
      const sort = evenTicketStatus(this.sortValue)
      this.$store.dispatch('myProduct/getListEventTicket', { sort, next: this.next })
    },
    redirectEvent() {
      // window.location = this.$config.homepageKompasEvent -> PCP Kompas Event not ready yet
      window.location.href = 'https://gerai.kompas.id/produk-kategori/tiket/'
    },
  },
})
