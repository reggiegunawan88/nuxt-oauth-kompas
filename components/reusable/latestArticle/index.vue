<template src="./template.html"></template>
<script>
import Vue from 'vue'
import { kImg } from '@kompas/ui'
import { formatArticleDate } from '~/components/utils/helper/date'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  components: { kImg },
  computed: {
    latestArticles() {
      const articles = []
      const allArticles = this.$store.state.onboarding.latestArticles.list
      allArticles.forEach((art) => {
        if (!art.isFreemium) {
          articles.push(art)
        }
      })
      const result = articles.slice(0, 6) // limit to only 6 articles
      return result
    },
    isLoading() {
      return this.$store.state.onboarding.latestArticles.isLoading
    }
  },
  mounted() {
    this.$store.dispatch('onboarding/getLatestArticles')
  },
  methods: {
    formatArticleDate,
    redirectToArticle(link) {
      eventTracker('clickArticleSubs')
      window.location = link
    }
  }
})
</script>
