<template>
  <div class="grid grid-cols-1 laptop:grid-cols-3 w-full py-10 mx-4">
    <!-- nav bar -->
    <div class="flex w-full items-center gap-5 invisible laptop:visible">
      <a v-for="(item, key) in list" :key="key" class="cursor-pointer" :href="item.url" target="_blank">
        <span class="font-sans text-sm text-blue-royal-70"
          >{{ item.name }}
          <k-chip v-if="item.label" :style="{ 'border-radius': '.25rem', position: 'relative', top: '-16px', display: 'inline-flex', 'background-color': '#D71920' }">
            <span class="font-normal text-grey-10 capitalize">Baru </span>
          </k-chip>
        </span>
      </a>
    </div>
    <!-- Kompas homepage img -->
    <div class="flex justify-center w-full">
      <a href="https://kompas.id" class="flex w-64 max-w-full" title="Kompas.id">
        <img src="~/assets/kompas-56.gif" alt="Kompas.id" />
      </a>
    </div>
  </div>
</template>
<script>
import { kChip } from '@kompas/ui'
export default {
  name: 'MastheadDefault',
  components: {
    kChip,
  },
  data() {
    return {
      list: [
        {
          name: 'Mobile App',
          url: 'https://linktr.ee/unduhaplikasikompas.id/?utm_source=accountkompasid&utm_medium=header_button&utm_content=mobileapp&utm_campaign=installapp',
          label: false,
        },
        {
          name: 'Gerai',
          url: 'https://gerai.kompas.id/?utm_source=accountkompasid&utm_medium=header_button&utm_content=gerai',
          lebel: false,
        },
        {
          name: 'Kompaspedia',
          url: 'https://kompaspedia.kompas.id/?utm_source=accountkompasid&utm_medium=header_button&utm_content=kompaspedia',
          label: true,
        },
      ],
      listRight: [
        // {
        //   name: 'Daftar Newsletter',
        //   url: 'https://newsletter.kompas.id/?utm_source=kompasid&utm_medium=logo_homepage&utm_content=homepage&utm_campaign=subscribe_newsletter',
        //   label: true
        // }
      ],
    }
  },
}
</script>
