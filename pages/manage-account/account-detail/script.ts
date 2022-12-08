import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      tabMenu: [
        {
          title: 'Data Diri',
          link: '/manage-account/account-detail/personal-data',
        },
        {
          title: 'Keamanan Akun',
          link: '/manage-account/account-detail/account-security',
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
      if (routeName === 'manage-account-account-detail') {
        this.$router.push('/manage-account/account-detail/personal-data')
      }
    },
  },
})
