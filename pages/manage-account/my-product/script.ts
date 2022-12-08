import Vue from 'vue'
import backtoTop from '~/components/reusable/backtoTop.vue'
export default Vue.extend({
  components: {
    backtoTop,
  },
  data() {
    return {
      tabMenu: [
        {
          title: 'Tiket',
          link: '/manage-account/my-product/ticket',
        },
      ],
    }
  },
  watch: {
    '$route.name': {
      handler(newVal) {
        this.setDefaultPage(newVal)
      },
    },
  },
  mounted() {
    this.setDefaultPage(this.$route.name)
  },
  methods: {
    setDefaultPage(routeName: any) {
      // redirect to default page if url points to parent
      if (routeName === 'manage-account-my-product') {
        this.$router.push('/manage-account/my-product/ticket')
      }
    },
  },
})
