<template>
  <div>
    <b-modal
      v-model="modal"
      :title="$t('dic.productdetail') + ' : ' + productCode"
      no-close-on-backdrop
      header-bg-variant="info"
      modal-class="info"
      :size="isCompleted ? 'xxl' : 'xl'"
      centered
      no-enforce-focus
      @ok="okClicked"
    >
      <b-col>
        <b-row>
          <b-col lg="6">
            <b-form-group :label="$t('dic.labeldescription')" label-for="labeldescription">
              <b-form-input id="labeldescription" v-model="labelDescription" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              :label="$t('dic.productiondescription')"
              label-for="productiondescription"
            >
              <b-form-input id="productiondescription" v-model="productionDescription" disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-tabs content-class="border-0 pt-3" justified pills v-model="tabIndex" v-if="isShowTab">
          <b-tab :title="$t('dic.productiondetail')" class="p-0">
            <productdetail
              ref="product"
              :product="product.data"
              :isLoading="isLoading"
              @openInnerOuterDetail="openInnerOuterDetail"
            ></productdetail>
          </b-tab>
          <b-tab :title="$t('dic.standardcost')" class="p-0">
            <costdetail ref="cost" :item="item"></costdetail>
          </b-tab>
        </b-tabs>
        <div v-else>
          <productdetail
            ref="product"
            :product="product.data"
            :isLoading="isLoading"
            @openInnerOuterDetail="openInnerOuterDetail"
          ></productdetail>
        </div>
      </b-col>
      <template v-slot:modal-footer="{ok}">
        <b-button @click="ok" variant="info">
          <span class="fa fa-check"></span>
          <span class="ml-2">{{$t('dic.ok')}}</span>
        </b-button>
      </template>
    </b-modal>

    <productinnerouterdialog v-model="modalInnerOuter" :item="productItem"></productinnerouterdialog>
  </div>
</template>

<script>
import { GetObjVal } from '@/shared/utils'
import productdetail from './productdetail/productdetail'
import costdetail from './costdetail/costdetail'
import productinnerouterdialog from './productdetail/productinnerouterdialog'
import { productCategory } from '@/shared/define'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    isShowTab: {
      type: Boolean,
      default: true
    }
  },
  components: {
    productdetail,
    costdetail,
    productinnerouterdialog
  },
  computed: {
    productCode() {
      return GetObjVal(this.item, 'product.code')
    },
    labelDescription() {
      return GetObjVal(this.item, 'product.descriptionSales')
    },
    productionDescription() {
      return GetObjVal(this.item, 'product.descriptionProd')
    },
    isCompleted() { return GetObjVal(this.item, 'product.productType.groupType') == productCategory.completed }
  },
  data() {
    return {
      modal: false,
      tabIndex: 0,
      product: {
        productID: null,
        data: {},
        loadData: (productID, customerID) => {
          this.isLoading = true
          if (productID != this.product.productID || customerID != this.product.customerID) {
            this.$root.api.ProductGet({
              data: { id: productID, customer_id: customerID },
              callback: res => {
                this.product.data = res
                this.product.productID = productID
                this.product.customerID = customerID
                this.isLoading = false
                this.$refs.product.onLoadProductSetup()
              }
            })
          } else {
            this.isLoading = false
            this.$refs.product.onLoadProductSetup()
          }
        }
      },
      isLoading: false,
      productItem: {},
      modalInnerOuter: false
    }
  },
  methods: {
    okClicked(e) {
      this.$emit('ok', e)
    },
    onOpen() {
      setTimeout(() => {
        if (this.tabIndex) {
          this.$refs.cost.onLoadData()
        } else {
          this.product.loadData(this.item.product.id, this.item.product.customerProduct.customer.id)
        }
      })
    },
    openInnerOuterDetail(item) {
      this.productItem = item
      this.modalInnerOuter = true
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
    },
    tabIndex(val) {
      this.onOpen()
    }
  }
}
</script>
