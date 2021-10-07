import { status, configMode } from '@/shared/define'
import { GetObjArr, GetObjVal, GetLastUpdate, ObjCopyValue, GetObjValJoin } from '@/shared/utils'
export default {
  data() {
    return {
      status: { lists: status, current: status.filter(v => v.value != 'C'), selected: [status[0]] },
      mode: 'Add',
      modal: false,
      modalDel: false,
      alertMsg: '',
      configMode: configMode
    }
  },
  computed: {
    config() {
      return configMode[this.mode].class
    },
    savedMsg() {
      return this.alertMsg ? this.alertMsg : this.$i18n.messages[this.$i18n.locale].dic.saved
    },
    deletedMsg() {
      return this.alertMsg ? this.alertMsg : this.$i18n.messages[this.$i18n.locale].dic.deleted
    },
    statusFilter() {
      return GetObjArr(this.status.selected, 'value')
    }
  },
  methods: {
    GetStatus(val) {
      return GetObjVal(this.status.lists.find(d => d.value === val), 'text')
    },
    Saved() {
      this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.savedMsg)
      this.modal = this.alertMsg != ''
      return this.alertMsg == ''
    },
    Deleted() {
      this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.deletedMsg)
      return this.alertMsg == ''
    },
    SetErrorMsg(res, fields, gendata) {
      this.alertMsg = ''
      if (Array.isArray(res)) {
        res.forEach((d, i) => {
          try {
            if (typeof gendata === 'function') gendata(d)
            else this.GenData(d)
          } catch (e) { };
          if (d._result._status == 'F') {
            this.alertMsg = this.alertMsg.concat('#', (i + 1), ' ', GetObjValJoin(d, fields, ' | '), ' : ', d._result._message, '\n')
          }
        })
      }
    },
    GenData(x) {
      x.lastupdate = GetLastUpdate(x)
    },
    SetData(res, data, fields, remove, gendata) {
      this.SetErrorMsg(res, fields, gendata)
      if (remove) this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.deletedMsg)
      else this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.savedMsg)
      if (!this.alertMsg) {
        if (Array.isArray(res)) {
          res.forEach(x => {
            const tmp = data.find(y => y.id == x.id)
            if (tmp) {
              if (remove) data.splice(data.indexOf(tmp), 1)
              else {
                ObjCopyValue(tmp, x)
              }
            }
          })
        }
        return true
      }
      return false
    },
    UpdateData(res, data) {
      if (Array.isArray(res)) {
        res.forEach(x => {
          const tmp = data.find(y => y.id == x.id)
          if (tmp) {
            ObjCopyValue(tmp, x)
          }
        })
      }
    }
  }
}
