<template>
  <div>
    <b-modal
      v-model="modal"
      :title="title ? title : $t('dic.msgdel')"
      no-close-on-backdrop
      header-bg-variant="danger"
      modal-class="danger"
      centered
      no-enforce-focus
      @cancel="onClick(false)"
      @ok="onClick(true)"
      @close="onClick(false)"
    >
      <h4>{{ msg ? msg : $t('dic.msgdel') }}</h4>
      <p v-html="detail"></p>

      <template v-slot:modal-footer="{cancel, ok}">
        <b-button @click="cancel">
          <span class="fa fa-times"></span>
          <span class="ml-2">{{$t('dic.cancel')}}</span>
        </b-button>
        <b-button @click="ok" variant="danger">
          <span class="fa fa-check"></span>
          <span class="ml-2">{{$t('dic.confirm')}}</span>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import dic from '@/shared/dic'

export default {
  i18n: {
    messages: {
      en: { dic: { msgdel: 'Confirm data deletion.' } },
      th: { dic: { msgdel: 'ยืนยันการลบข้อมูล' } }
    },
    sharedMessages: dic
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    msg: {
      type: String,
      default: null
    },
    detail: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    onClick(e) {
      // this.$emit('input', false);
      if (e) {
        this.$emit('ok', e)
      }
    }
  },
  watch: {
    value(val) {
      this.modal = val
    },
    modal(val) {
      this.$emit('input', val)
    }
  }
}
</script>
