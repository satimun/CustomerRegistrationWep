import { configMode } from '@/shared/define'
import { GetObjVal, GetLastUpdate, GetObjValJoin, ObjCopyValue } from '@/shared/utils'
export default {
  data() {
    return {
      modal: false,
      data: [],
      alertMsg: '',
      configMode: configMode,
      approvalStatus: {
        lists: [],
        selected: null
      },
      d_approved: true,
      d_notapproved: true,
      selected: []
    }
  },
  computed: {
    config() {
      return configMode[this.mode].class
    },
    approvedMsg() {
      return this.alertMsg ? this.alertMsg : this.$i18n.messages[this.$i18n.locale].dic.approvedsuccess
    },
    notApprovedMsg() {
      return this.alertMsg ? this.alertMsg : this.$i18n.messages[this.$i18n.locale].dic.notapprovedsuccess
    },
    approvedStatusFilter() {
      return GetObjVal(this.approvalStatus.lists.find(x => x.id == this.approvalStatus.selected), 'status')
    }
  },
  mounted() {
  },
  methods: {
    SetErrorMsg(res, fields, gendata) {
      this.alertMsg = ''
      if (Array.isArray(res)) {
        res.forEach((d, i) => {
          try {
            if (typeof gendata === 'function') gendata(d)
            else this.GenData(d)
          } catch (e) { };
          if (d._result._status == 'F') {
            this.alertMsg = this.alertMsg.concat('#', (i + 1), ' ')
            fields.forEach((f, j) => {
              if (j == fields.length - 1) this.alertMsg = this.alertMsg.concat(GetObjVal(d, f, ''), ' : ')
              else this.alertMsg = this.alertMsg.concat(GetObjVal(d, f, ''), ' | ')
            })
            this.alertMsg = this.alertMsg.concat(d._result._message, '\n')
          }
        })
      }
    },
    GenData(x) {
      x.lastupdate = GetLastUpdate(x)
    },
    SetData(res, data, fields, approved, gendata) {
      this.SetErrorMsg(res, fields, gendata)
      if (approved) this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.approvedMsg)
      else this.$root.AlertMessage(this.alertMsg ? 'error' : 'success', this.notApprovedMsg)
      if (!this.alertMsg) {
        if (Array.isArray(res)) {
          res.forEach(x => {
            const tmp = data.find(y => y.id == x.id)
            if (tmp) {
              ObjCopyValue(tmp, x)
            }
          })
        }
        return true
      }
      return false
    },
    SetApprovalStatus(table) {
      return new Promise((resolve, reject) => {
        this.$root.api.GetForApproval({
          data: { Table: table },
          callback: res => {
            this.approvalStatus.lists = [{ id: 1000, view: 'All Status', status: null }]
            res.filter(x => x.groupFlag == 'D').forEach(x => {
              x.status = x.updateFlag.id + '' + x.id
            })

            const tmp = res.filter(x => x.groupFlag == 'D')
            if (tmp.length) {
              this.approvalStatus.lists.push({ id: 2000, view: 'For Approval', status: tmp.map(x => x.updateFlag.id + '' + x.id) })
            }
            res.filter(x => x.groupFlag == 'A').forEach(x => {
              this.approvalStatus.lists.push({ id: x.id, view: GetObjValJoin(x), status: [x.id] })
            })

            let sel = this.approvalStatus.lists.find(x => x.id == 2000)
            if (!sel) {
              sel = this.approvalStatus.lists.find(x => x.id == 1000)
            }
            this.approvalStatus.selected = sel.id
            resolve(true)
          }
        })
      })
    }
  }
}
