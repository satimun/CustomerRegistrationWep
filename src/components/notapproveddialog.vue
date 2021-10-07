<template>
  <div>
    <b-modal
      v-model="modal"
      :title="title ? title : $t('dic.notapproved')"
      no-close-on-backdrop
      header-bg-variant="warning"
      modal-class="warning"
      centered
      no-enforce-focus
      @ok="onClicked(true)"
    >
      <b-col>
        <slot></slot>
        <b-form-group :label="$t('dic.notemore')" label-for="notemore">
          <b-form-textarea id="notemore" v-model="form.note" rows="2"></b-form-textarea>
        </b-form-group>
        <b-form-group :label="$t('dic.remark')" label-for="remark">
          <multiselect
            id="remark"
            v-model="form.remark"
            :options="remarkLists"
            :allow-empty="true"
            label="_label"
            track-by="id"
          ></multiselect>
        </b-form-group>
      </b-col>

      <template v-slot:modal-footer="{cancel, ok}">
        <b-button @click="cancel">
          <span class="fa fa-times"></span>
          <span class="ml-2">{{$t('dic.cancel')}}</span>
        </b-button>
        <b-button @click="ok" variant="warning">
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
      en: {
        dic: {
          notemore: 'Note More'
        }
      },
      th: {
        dic: {
          notemore: 'หมายเหตุเพิ่มเติม'
        }
      }
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
    remarkLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modal: false,
      form: {
        remark: '',
        note: ''
      }
    }
  },
  methods: {
    onClicked() {
      this.$emit('ok', this.form)
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
