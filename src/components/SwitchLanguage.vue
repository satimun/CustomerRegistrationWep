<template>
    <!-- BEGIN: Dark Mode Switcher-->
  <div
    class="dark-mode-switcher cursor-pointer shadow-md fixed bottom-20 right-0 box dark:bg-dark-2 border rounded-full w-20 h-12 flex items-center justify-center z-50 mb-10 mr-10"

  >

             <div class="absolute right-0 top-0 mr-5 mt-3 dropdown">

              <a
                class="dropdown-toggle w-15 h-10 block font-medium uppercase"
                href="javascript:;"
                aria-expanded="false"
              >
              {{$i18n.locale}}
              <ChevronDownIcon
                  class="w-5 h-5 text-gray-600 dark:text-gray-300"
                />

              </a>
              <div class="dropdown-menu w-40">
                <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                  <a
                    href="#"
                    :class="['flex items-center block p-2 uppercase transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md',isColor(lang)]"
                    v-for="(lang, i) in langs"
        :key="`lang-${i}`"
               :content="lang"
               @click="onSwitch(lang)"
                  >
                    {{ lang }}
                  </a>
                </div>
              </div>
            </div>

  </div>
  <!-- END: Dark Mode Switcher-->
</template>

<script>
export default {
  name: 'SwitchLocale',
  data() {
    return { langs: ['en', 'th'] }
  },
  methods: {
    onSwitch(lang) {
      this.$i18n.locale = lang
    },
    isColor(lang) {
      return lang == this.$i18n.locale ? 'text-theme-17 block font-extrabold' : ''
    }
  }
}
</script>

<style>
select {
    width: 150px;
    line-height: 49px;
    height: 38px;
    font-size: 22px;
    outline: 0;
    margin-bottom: 15px;
}
</style>
