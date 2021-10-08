<template>
  <div>
    <b-modal
      v-model="modal"
      :title="title ? title : $t('dic.datachanged')"
      no-close-on-backdrop
      centered
      @cancel="onClicked(false)"
      @ok="onClicked(true)"
      @close="onClicked(undefined)"
    >
      <slot>
        <h4>{{ msg ? msg : $t('dic.msg') }}</h4>
        <p v-html="detail"></p>
      </slot>
      <template v-slot:modal-footer="{cancel, ok}">
        <b-button @click="cancel" variant="danger">
          <span class="fa fa-times"></span>
          <span class="ml-2">{{ noTitle ? noTitle : $t('dic.no')}}</span>
        </b-button>
        <b-button @click="ok" variant="success">
          <span class="fa fa-check"></span>
          <span class="ml-2">{{ yesTitle ? yesTitle : $t('dic.yes')}}</span>
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
      en: { dic: { datachanged: 'Data Changed', msg: 'Do you want to save the changes?' } },
      th: { dic: { datachanged: 'ข้อมูลมีการเปลี่ยนแปลง', msg: 'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?' } }
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
    },
    noTitle: {
      type: String,
      default: null
    },
    yesTitle: {
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
    onClicked(e) {
      this.$emit('onClick', e)
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
