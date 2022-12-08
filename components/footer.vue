<template>
  <footer class="bg-white flex bottom-0 border-t-2 border-gray-150 w-full tablet:absolute static font-sans text-sm">
    <div class="mx-auto text-gray-450 w-full max-w-xl">
      <div class="laptopM:mx-4">
        <div class="flex flex-col items-center mx-4 py-8 tablet:flex-row">
          <div class="flex flex-row font-sans mb-4 w-full tablet:justify-between tablet:mb-0 tablet:w-1/4">
            <div class="flex"><strong>LAYANAN</strong><span class="ml-1">PELANGGAN</span></div>
            <div class="mx-auto text-sm hidden tablet:flex">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </div>
          </div>

          <div class="flex flex-col w-full tablet:justify-between tablet:flex-row tablet:w-3/4">
            <!-- section: layanan -->
            <!-- Kompas Kring -->
            <div class="flex flex-row items-center mb-4 mobileL:mb-2">
              <div class="flex mr-2 text-lg">
                <font-awesome-icon :icon="['fas', 'phone']" />
              </div>
              <div class="flex flex-col">
                <div class="font-bold text-sm uppercase w-full">KOMPAS KRING</div>
                <div class="w-full text-xs">
                  <a href="tel:+622125676000" class="text-gray-450">+6221 2567 6000</a>
                </div>
              </div>
            </div>
            <!-- end of Kompas Kring -->

            <!-- Kompas Whatsapp -->
            <div class="flex flex-row items-center mb-4 mobileL:mb-2">
              <div class="flex mr-2 text-lg">
                <font-awesome-icon :icon="['fab', 'whatsapp']" />
              </div>
              <div class="flex flex-col">
                <div class="font-bold text-sm uppercase w-full">WHATSAPP</div>
                <div class="w-full text-xs">
                  <a
                    href="whatsapp://send/6281290050800#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end"
                    class="text-gray-450"
                    >+6281 2900 5080 0</a
                  >
                </div>
              </div>
            </div>
            <!-- end of Kompas Whatsapp -->

            <!-- Kompas Email -->
            <div class="flex flex-row items-center mb-4 mobileL:mb-2">
              <div class="flex mr-2 text-lg">
                <font-awesome-icon :icon="['far', 'envelope']" />
              </div>
              <div class="flex flex-col">
                <div class="font-bold text-sm uppercase w-full">EMAIL</div>
                <div class="w-full text-xs">
                  <a href="mailto:hotline@kompas.id" class="text-gray-450">hotline@kompas.id</a>
                </div>
              </div>
            </div>
            <!-- end of Kompas Whatsapp -->

            <!-- Kompas Jam Kerja -->
            <div class="flex flex-row items-center mb-4 mobileL:mb-2">
              <div class="flex mr-2 text-lg">
                <font-awesome-icon :icon="['far', 'clock']" />
              </div>
              <div class="flex flex-col">
                <div class="font-bold text-sm uppercase w-full">Jam Kerja</div>
                <div class="w-full text-xs">
                  <span>06.00-18.00 WIB</span>
                </div>
              </div>
            </div>
            <!-- end of Kompas Jam Kerja -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
