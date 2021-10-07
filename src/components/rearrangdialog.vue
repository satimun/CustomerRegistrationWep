<template>
  <div>
    <b-modal
      v-model="modal"
      :title="title + ' : ' + $t('dic.rearrang')"
      no-close-on-backdrop
      header-bg-variant="info"
      modal-class="info"
      centered
      size="md"
      no-enforce-focus
      ok-variant="info"
      @ok="onClicked()"
    >
      <b-col>
        <slot></slot>
        <b-form-group :label="$t('dic.arrangeby')" label-for="arrangeby">
          <multiselect
            id="arrangeby"
            v-model="form.arrangeBy"
            :options="arrangeBy.lists"
            :allow-empty="true"
            label="_label"
            track-by="id"
          ></multiselect>
        </b-form-group>

        <b-form-group :label="$t('dic.direction')" label-for="direction">
          <b-form-select id="direction" v-model="form.direction" :options="direction"></b-form-select>
        </b-form-group>
      </b-col>

      <template v-slot:modal-footer="{cancel, ok}">
        <b-button @click="cancel">
          <span class="fa fa-times"></span>
          <span class="ml-2">{{$t('dic.cancel')}}</span>
        </b-button>
        <b-button @click="ok" variant="info" :disabled="$v.form.$invalid">
          <span class="fa fa-list-ol"></span>
          <span class="ml-2">{{$t('dic.rearrang')}}</span>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { GetObjVal, SetObjVal, ObjResetValue, GetObjValJoin, IsNull, ObjCopyValue, ObjCopy } from '@/shared/utils'
import { required } from 'vuelidate/lib/validators'
import { direction } from '@/shared/define'
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    // quotationNo: {
    //   type: String,
    //   default: ''
    // },
    printFormat: {
      type: Object,
      default: () => []
    },
    option: {
      type: String
    }
  },
  computed: {
    ...mapGetters('constant', {
      tagGroupLists: 'tagGroupLists'
    })
  },
  data() {
    return {
      modal: false,
      form: {
        arrangeBy: null,
        direction: 'asc'
      },
      direction: direction,
      arrangeBy: {
        lists: []
      }
    }
  },
  methods: {
    async onOpen() {
      await this.$store.dispatch('constant/tagGroupLists')
      this.form.arrangeBy = null
      this.arrangeBy.lists = ObjCopy(this.tagGroupLists)

      if (this.option) {
        this.arrangeBy.lists.splice(0, 0, {
          id: 'option',
          _label: this.option
        })
      }

      if (GetObjVal(this.printFormat, 'id') > 0) {
        const printFormat = ObjCopy(this.printFormat)
        printFormat.id = 0
        printFormat._label = GetObjValJoin(printFormat)
        this.arrangeBy.lists.splice(0, 0, printFormat)
        this.form.arrangeBy = this.arrangeBy.lists[0]
      }
    },
    onClicked(e) {
      this.$emit('ok', this.form)
    }
  },
  watch: {
    value(val) {
      this.modal = val
      if (val) {
        this.onOpen()
      }
    },
    modal(val) {
      this.$emit('input', val)
    }
  },
  validations: {
    form: {
      // arrangeBy: { required },
      direction: { required }
    }
  }
}
</script>
