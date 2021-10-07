<template>
  <div>
    <b-modal
      v-model="modal"
      :title="$t('dic.productassembly') + ' : ' + productCode"
      no-close-on-backdrop
      header-bg-variant="info"
      modal-class="info"
      size="xl"
      centered
      no-enforce-focus
      @ok="okClicked"
    >
      <b-col>
        <b-row>
          <b-col lg="6">
            <b-form-group :label="$t('dic.labeldescription')" label-for="labeldescription">
              <b-form-input
                id="labeldescription"
                v-model="labelDescription"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group :label="$t('dic.assemblytype')" label-for="assemblytype">
              <b-form-input
                id="assemblytype"
                v-model="assemblyType"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-card no-body class="mb-2">
          <grid
          :fields="fields"
          :title="$t('dic.inner_outer')"
          name="productassembly"
          :o_nav_visible="false"
          :data="specAssemblys"
          :o_col_checkbox="false"
          trackBy="seq"
        ></grid>
        </b-card>
      </b-col>
      <template v-slot:modal-footer="{ok}">
        <b-button @click="ok" variant="info">
          <span class="fa fa-check"></span>
          <span class="ml-2">{{$t('dic.ok')}}</span>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { GetObjVal, GetObjValJoin } from '@/shared/utils'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    productCode() {
      return GetObjVal(this.product, 'code')
    },
    labelDescription() {
      return GetObjVal(this.product, 'descriptionSales')
    },
    assemblyType() {
      return GetObjValJoin(GetObjVal(this.product, 'nets.assemblyType'), ['codeStd', 'description'])
    },
    specAssemblys() {
      return GetObjVal(this.product, 'assemblys')
    }
  },
  data() {
    return {
      modal: false,
      fields: [
        {
          name: 'seq',
          title: 'dic.inner_outer',
          sortField: 'seq',
          visible: true,
          width: 100,
          class: 'text-center'
        },
        {
          name: 'layerProduct.code',
          title: 'dic.productcode',
          sortField: 'layerProduct.code',
          visible: true,
          tooltip: item => {
            return GetObjVal(item.layerProduct, 'descriptionProd')
          }
        },
        {
          name: 'layerProduct.customerProduct.descriptionSales',
          title: 'dic.labeldescription',
          sortField: 'layerProduct.customerProduct.descriptionSales',
          visible: true,
          tooltip: item => {
            return GetObjVal(item.layerProduct, 'nets.productSelvage.selvage.description')
          }
        },
        {
          name: 'netsAmountPC',
          title: 'dic.netsamountpc',
          sortField: 'netsAmountPC',
          visible: true,
          class: 'text-center'
        },
        {
          name: 'netsCompletedPC',
          title: 'dic.netscompletedpc',
          sortField: 'netsCompletedPC',
          visible: true,
          class: 'text-center'
        }
      ]
    }
  },
  methods: {
    okClicked(e) {
      this.$emit('ok', e)
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
