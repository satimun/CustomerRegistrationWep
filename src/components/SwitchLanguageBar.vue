/* eslint-disable vue/no-parsing-error */
<template>
<div class="intro-x dropdown mr-4 sm:mr-6">
        <div
          class="dropdown-toggle notification cursor-pointer uppercase"
          role="button"
          aria-expanded="false"
          :title="this.$i18n.locale"
        >
          <SettingsIcon class="notification__icon dark:text-gray-300 hidden" />
           <img
                alt="Profile picture"
                class="zoom-in w-8"
                :src="`${langicon}`"
              />
        </div>
        <div class="pt-2 dropdown-menu w-10">
          <div
            class="dropdown-menu__content box dark:bg-dark-6 notification-content__box p-2"
          >

            <div class="notification-content__title hidden">{{$t('dic.lang')}} :</div>

        <div
               v-for="(lang, i) in langs"
        :key="`lang-${i}`"
              :class="['cursor-pointer relative flex items-center mt-2 uppercase center',isColor(lang)]"
              @click="onSwitch(lang)"
            >
            {{ lang }}

        </div>

          </div>
        </div>

      </div>

</template>

<script>
export default {
  name: 'SwitchLanguageBar',
  data() {
    return {
      langs: ['en', 'th'],
      langicon: require('@/assets/images/language.png')
    }
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
