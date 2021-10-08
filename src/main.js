import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import globalComponents from './global-components'
import utils from './utils'
import './libs'

// ------Custom

import VueLocalStorage from 'vue-web-storage'

import Multiselect from '@/components/multiselect'

import grid from '@/components/grid.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

import VueClipboard from 'vue-clipboard2'

import resize from 'vue-resize-directive'

import Draggable from 'vuedraggable'

// import dic from '@/shared/dic'
// import { createI18n } from 'vue-i18n'

import VueProgressBar from '@aacassandra/vue3-progressbar'

import coremixin from '@/shared/coremixin'
import i18n from '@/i18n'

// ---End

// SASS Theme
import './assets/sass/app.scss'

/* const i18n = createI18n({
  legacy: false,
  locale: 'th',
  globalInjection: true,
  messages: dic
}) */

const options = {
  color: '#ffc107',
  failedColor: '#f92525',
  thickness: '3px',
  transition: {
    speed: '1s', // 1s
    opacity: '1s', // 0.6s
    termination: 600
  },
  // autoRevert: true,
  location: 'top',
  inverse: false
}

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueLocalStorage)
  .component('multiselect', Multiselect)
  .component('grid', grid)
  .component('Breadcrumb', Breadcrumb)
  .use(VueClipboard)
  .component('draggable', Draggable)
  .use(i18n)
  .use(resize)
  .use(VueProgressBar, options)
  .mixin(coremixin)

globalComponents(app)
utils(app)

export default app.mount('#app')
