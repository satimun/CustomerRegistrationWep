import { GetObjVal, IsNull, ObjCopy } from './utils'
import api from './api'
import axios from './instance'
import { h } from 'vue'
import Toastify from 'toastify-js'

export default {
  mixins: [api],
  data() {
    return {
      darkmode: false,
      dateformat: { day: 'numeric', month: '2-digit', year: 'numeric' },
      datelabel: {
        th: {
          labelPrevYear: 'ปีก่อน',
          labelPrevMonth: 'เดือนก่อน',
          labelCurrentMonth: 'เดือนปัจจุบัน',
          labelNextMonth: 'เดือนถัดไป',
          labelNextYear: 'ปีถัดไป',
          labelToday: 'วันนี้',
          labelTodayButton: 'วันนี้',
          labelResetButton: 'รีเซ็ต'
        },
        en: {
          labelTodayButton: 'Today'
        }
      },
      saveRequire: false,
      permissions: [],
      isLoaded: false,
      socket: null
    }
  },
  methods: {
    connectSocket() {
      this.socket = new WebSocket(process.env.VUE_APP_SOCKET)
      this.socket.onmessage = ({ data }) => {
        try {
          const res = JSON.parse(data)
          if (res.pong) return
          if (res.notify) {
            this.$store.dispatch('notify/updateData', res.notify)
            if (GetObjVal(this.$store.getters['notify/userConfig'], 'showPopup')) this.notificationsToast(res.notify)
          } else if (res.datachange) {
            this.$store.dispatch(res.datachange)
          } else if (res.document) {
            const document = this.$store.getters.document
            if (document && document.target == res.document.target && document.id == res.document.id) {
              if (!res.document.locked) {
                this.$store.dispatch('setDocument', res.document)
                const tmp = ObjCopy(res)
                tmp.document.locked = true
                this.$root.socket.send(JSON.stringify(tmp))
              } else {
                this.$store.dispatch('setDocument', res.document)
              }
            }
          }
        } catch (ex) {

        }
      }
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({ token: this.$localStorage.get('Token') }))

        // reload notifications
        this.$store.dispatch('notify/loadData')
      }
    },
    saveChange(val) {
      if (val == undefined) {
        this.saveRequire = !this.saveRequire
      } else {
        this.saveRequire = val
      }
    },
    setNav(data) {
      this.nav.items.forEach(x => this.navMap(x, data))
      this.nav.items = this.nav.items.slice()
    },
    setPermission(data) {
      this.permissions = data
      this.isLoaded = true
    },
    getPermission() {
      let tmp = this.permissions.find(y => y.path == window.location.pathname)
      if (!tmp) {
        tmp = {
          isView: false, isAdd: false, isEdit: false, isDelete: false, isExport: false, isPrint: false
        }
      }
      return tmp
    },
    navMap(x, data) {
      const tmp = data.find(y => y.path == x.url)
      if (tmp) {
        x.permission = tmp.permission
        x.isView = tmp.isView
      } else {
        x.isView = false
      }
      if (Array.isArray(x.children)) {
        x.children.forEach(y => {
          this.navMap(y, data)
        })
      }
    },
    getLocale() {
      return this.$root.$i18n.locale.concat('-GB')
    },
    getDatelabels() {
      return this.datelabel[this.$root.$i18n.locale] || {}
    },
    notificationsToast(noti) {
      const h = this.$createElement
      const vNodesMsg = h(
        'p',
        {
          class: ['text-center', 'b-toast-warning'],
          on: {
            click: () => {
              noti.isRead = noti.isClick = true
              const saveData = [noti]
              this.$store.dispatch('notify/onSave', saveData)
            }
          }
        },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
                    `${noti.message.description} `,
                    h('b-spinner', { props: { type: 'grow', small: true } })
        ]
      )

      this.$bvToast.toast(vNodesMsg, {
        to: noti._url,
        title: noti.title.description,
        variant: 'warning',
        autoHideDelay: 10000,
        appendToast: true,
        solid: true,
        toaster: 'b-toaster-bottom-right'
      })
    },
    AlertMessage(type, msg = '', title = '') {
      let noti = document.getElementsByClassName('toast-body')
      noti = Array.from(noti)
      if (noti.find(x => x.textContent == msg)) {
        return
      }

      // const h = this.$createElement
      const vNodesMsg = []
      msg.split('\n').forEach(s => {
        if (s) vNodesMsg.push(h('p', {}, s))
      })

      var className = 'info'

      let time = 5000
      if (type == 'S' || type.toLowerCase() == 'success') {
        type = 'success'
        // title = !title ? this.$i18n.messages[this.$i18n.locale].dic.success.toUpperCase() : title
        title = !title ? this.$t('dic.success').toUpperCase() : title
        className = '#198754'
      } else if (type == 'F' || type.toLowerCase() == 'error') {
        type = 'danger'
        // title = !title ? this.$i18n.messages[this.$i18n.locale].dic.error.toUpperCase() : title
        title = !title ? this.$t('dic.error').toUpperCase() : title
        time = 60000
        className = '#DC3545'
      } else if (type == 'W' || type.toLowerCase() == 'warning') {
        type = 'warning'
        // title = !title ? this.$i18n.messages[this.$i18n.locale].dic.warning.toUpperCase() : title
        title = !title ? this.$t('dic.warning').toUpperCase() : title
        time = 30000
        className = '#FFC107'
      } else {
        className = '#121212'
      }
      /* this.$bvToast.toast(vNodesMsg, {
        title: title,
        variant: type,
        solid: true,
        toaster: 'b-toaster-top-center',
        appendToast: true,
        autoHideDelay: time
      }) */

      Toastify({
        text: msg,
        duration: time,
        newWindow: true,
        variant: type,
        close: true,
        gravity: 'top',
        position: 'right',
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          color: className
        },
        stopOnFocus: true,
        className: 'toastify-content'
      }).showToast()
    },
    AlertMessagedd() {
      const h = this.$createElement
      // Increment the toast count
      this.count++
      // Create the message
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-0'] },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
          ' Flashy ',
          h('strong', 'toast'),
          h('br'),
                    ` message #${this.count} `,
                    h('b-spinner', { props: { type: 'grow', small: true } })
        ]
      )
      // Create the title
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, 'The Title'),
          h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
        ]
      )
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: 'info'
      })
    },
    Call(o) {
      let urlx = IsNull(o.url) ? process.env.VUE_APP_API : o.url
      urlx = urlx + (IsNull(o.path) ? '' : o.path)

      if (o.method.toUpperCase() === 'GET') {
        if (o.data) {
          const key = Object.keys(o.data)
          urlx += '?'
          for (let i = 0; i < key.length; i++) {
            const tmp = o.data[key[i]]
            if (Array.isArray(tmp)) {
              if (tmp.length > 0) {
                for (let j = 0; j < tmp.length; j++) {
                  urlx += key[i] + '=' + (IsNull(tmp[j]) ? '' : tmp[j])
                  if (tmp.length > j + 1) urlx += '&'
                }
              } else { urlx += key[i] + '=' + (IsNull(o.data[key[i]]) ? '' : o.data[key[i]]) }
            } else { urlx += key[i] + '=' + (IsNull(o.data[key[i]]) ? '' : o.data[key[i]]) }
            if (key.length > i + 1) urlx += '&'
          }
        }
      }
      axios({
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          AccessToken: this.$localStorage.get('AccessToken'),
          Token: this.$localStorage.get('Token'),
          Lang: this.$localStorage.get('lang'),
          RecaptchaResponse: o.recaptcha
        },
        method: o.method.toUpperCase(),
        url: urlx,
        data: o.data ? o.data : {},
        withCredentials: true
      })
        .then(res => {
          o.callback(res.data)
        })
        .catch((error) => {
          console.error(error)
          if (/^O0/.test(GetObjVal(error, 'response.data.code'))) {
            if (/SingleSignOn/.test(o.path)) {
              // window.location.href = '/member/signin';
              if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
                window.location.href = '/member/signin'
              } else {
                window.location.href = `${process.env.VUE_APP_SINGLESIGNON}member/signin?backurl=${encodeURI(window.location.href)}`
              }
            } else {
              if (/^[/]member[/]/.test(window.location.pathname)) {
                window.location.href = '/member/singlesignon'
              } else {
                if (window.location.pathname) {
                  window.location.href = '/member/singlesignon?path=' + window.location.pathname
                }
              }
            }
          } else {
            if (typeof o.error == 'function') {
              o.error(error)
            } else {
              if (GetObjVal(error, 'response.data.message')) {
                this.$root.AlertMessage('error', GetObjVal(error, 'response.data.message'))
              } else {
                this.$root.AlertMessage('error', this.$i18n.messages[this.$i18n.locale].dic.connectservefail)
              }
            }
          }
        })
    }
  }
}
