<template>
  <div class="py-12 mx-auto w-full max-w-xl">
    <reusable-masthead />
    <section class="px-10 pt-2 md:flex-row lg:p-2 laptop:grid laptop:grid-cols-2 laptopL:mx-30 laptopL:pt-10 justify-items-center">
      <div class="flex flex-col self-center w-full">
        <!-- title and description -->
        <div class="flex flex-col self-center w-full md:mr-4 font-serif">
          <h1 class="font-chronicle text-2xl text-customTextColor font-bold">
            {{ message }}
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="font-sans text-base py-2" v-html="submessage" />
        </div>
      </div>
      <!-- image asset -->
      <div class="flex laptop:w-4/5 w-full mb-5">
        <!-- conditional asset for status code error -->
        <div v-if="status == 404" class="w-full">
          <img alt="Kami tidak dapat menemukan halaman yang Anda tuju." src="~/assets/404.png" class="w-full" />
        </div>
        <div v-else class="w-full">
          <img alt="Kami tidak dapat menemukan halaman yang Anda tuju." src="~/assets/405.png" class="w-full" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { statusErrorCodeMsg } from '~/assets/scripts/constants/statusCodeMsg'
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    // import status code msg from constant
    messages: statusErrorCodeMsg,
  }),
  head() {
    return {
      title: this.message,
    }
  },
  computed: {
    message() {
      const [message] = this.messages[this.status]
      return message
    },
    submessage() {
      const [, submessage] = this.messages[this.status]
      return submessage
    },
    status() {
      const { statusCode } = this.error
      const statuses = Object.keys(this.messages)
      return statuses.includes(statusCode.toString()) ? statusCode.toString() : '500'
    },
  },
}
</script>
