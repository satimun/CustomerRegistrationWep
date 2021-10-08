<template>
  <div id="app">
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { GetObjVal } from '@/shared/utils'
import dic from '@/shared/dic'

export default {
  name: 'app',
  created() {},

  computed: {},

  i18n: {
    messages: {
      en: {
        dic: {
          newversionavailable: 'New Version Available',
          feature3: 'You can install the application on your PC by following the steps below.'
        }
      },
      th: {
        dic: {
          newversionavailable: 'มีเวอร์ชันใหม่',
          feature3: 'คุณสามารถติดตั้งแอพพลิเคชั่นบนเครื่อง PC ของคุณได้ ตามขั้นตอนด้านล่าง'
        }
      }
    },
    sharedMessages: dic
  },

  mounted() {},

  data() {
    return {
      pathroute: null
    }
  },

  methods: {
    clearDocument() {
      try {
        const document = this.$store.getters.document
        if (document) {
          const tmp = { document: document }
          tmp.document.locked = false
          this.$root.socket.send(JSON.stringify(tmp))
          this.$store.dispatch('setDocument', undefined)
        }
      } catch (ex) { }
    },
    chkpermission() {
      if (/^[/]$/.test(window.location.pathname) || /^[/]notifications/.test(window.location.pathname)) return
      const tmp = this.$root.getPermission()
      if (tmp) {
        if (!tmp.isView) {
          this.$root.AlertMessage('warning', this.$i18n.messages[this.$i18n.locale].dic.permissionblock)
          this.$router.push('/')
        }
      }
    }
  },

  watch: {
    $route(p) {
      this.pathroute = p.path
      // console.log(this.pathroute.toLowerCase(), !this.pathroute.toLowerCase().includes('signup'))
      if (!/^[/]member/.test(p.path)) {
        if (!this.$localStorage.get('Token')) {
          if ((!this.pathroute.toLowerCase().includes('signup') && !this.pathroute.toLowerCase().includes('forgotpassword') &&
           !this.pathroute.toLowerCase().includes('resetpassword'))) {
            this.$router.push('/SignIn')
          }
        } else {
          if (this.$root.isLoaded || this.$root.permissions.length) this.chkpermission()
        }
      }
      document.title = (GetObjVal(p, 'meta.title') ? this.getTitle(GetObjVal(p, 'meta.title', '')) + ' - ' : '') + 'KKF Customer Registration'
      this.clearDocument()
    }
  }

}
</script>
