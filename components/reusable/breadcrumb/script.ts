import Vue from 'vue'
import { bahasa } from '~/assets/scripts/constants/bahasa'
export default Vue.extend({
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      const crumbs = [] as any

      let path = ''
      params.forEach((param) => {
        path = `${path}/${param}`
        // @ts-ignore
        const matchPath = this.$router.match(path)

        // match $router.path with params
        if (matchPath.name !== null) {
          crumbs.push({
            title: param,
            ...matchPath,
          })
        }
      })
      return crumbs.slice(1, 2) // limit breadcrumbs
    }
  },
  methods: {
    translateText(value: any) {
      const raw = value.replace(/-/g, '')
      const translate: any = bahasa
      return translate[raw]
    },
  }
})