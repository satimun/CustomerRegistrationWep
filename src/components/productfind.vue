<template>
  <div>
    <b-modal
      v-model="modal"
      :title="$t('dic.productfind')"
      no-close-on-backdrop
      header-bg-variant="success"
      modal-class="success"
      centered
      no-enforce-focus
      size="xl"
      @cancel="onClick(false)"
      @ok="onClick(true)"
      @close="onClick(false)"
      body-class="pt-0 pb-1"
    >
      <template v-slot:modal-header="{close}">
        <h5 class="modal-title">{{$t('dic.productfind')}}</h5>
        <div>
          <b-button-group size="sm">
            <b-button
              :variant="mode ? 'light' : 'primary'"
              @click="modeClicked(false)"
            >{{$t('dic.newproduct')}}</b-button>
            <b-button
              :variant="mode ? 'primary' : 'light'"
              @click="modeClicked(true)"
            >{{$t('dic.oldproduct')}}</b-button>
          </b-button-group>
          <button type="button" class="close" @click="close()">×</button>
        </div>
      </template>
      <b-col>
        <b-row>
          <grid
            ref="grid"
            :fields="fields"
            :o_select_single="true"
            name="productfind"
            :btnDefault="false"
            :o_nav_filter="true"
            :data="data"
            @grid:rowSelected="onRowSelected"
          >
            <template v-slot:nav-search>
              <search @onClick="loadData" v-slot="{avSearch}" class="pt-0" :isInGrid="true">
                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.filter') + ' : '"
                  label-for="filter"
                >
                  <b-form-input
                    ref="filter"
                    id="filter"
                    type="search"
                    :class="{'w350': !avSearch}"
                    :placeholder="(mode ? $t('dic.productcodeold') : $t('dic.productcode')) + ' ' + $t('dic.or') + ' ' + $t('dic.description')"
                    trim
                    v-model="filter.txtSearch"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.producttype') + ' : '"
                  label-for="producttype-filter"
                  v-show="avSearch"
                >
                  <multiselect
                    id="producttype-filter"
                    v-model="productType.selected"
                    :multiple="true"
                    :options="productTypeScopeLists"
                    label="_label"
                    track-by="id"
                    @open="productType.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.productquality') + ' : '"
                  label-for="productquality-filter"
                  v-show="avSearch"
                >
                  <multiselect
                    id="productquality-filter"
                    v-model="productQuality.selected"
                    :multiple="true"
                    :options="productQuality.lists"
                    label="_label"
                    track-by="id"
                    @open="productQuality.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.productiondiameter') + ' : '"
                  label-for="productiondiameter-filter"
                  v-show="avSearch"
                >
                  <multiselect
                    id="productiondiameter-filter"
                    v-model="productTwineNo.selected"
                    :multiple="true"
                    :options="productTwineNo.lists"
                    label="codeStd"
                    track-by="id"
                    @open="productTwineNo.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.diameterlabel')"
                  label-for="diameterlabel-filter"
                  v-show="avSearch"
                >
                  <multiselect
                    id="diameterlabel-filter"
                    v-model="diameterLabel.selected"
                    :multiple="true"
                    label="description"
                    track-by="id"
                    :options="diameterLabel.lists"
                    @open="diameterLabel.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.meshsizelabel')"
                  label-for="meshsizelabel-filter"
                  v-show="avSearch"
                  v-if="isNets || isCompleted"
                >
                  <multiselect
                    id="meshsizelabel-filter"
                    v-model="meshSizeLabel.selected"
                    :multiple="true"
                    label="description"
                    track-by="id"
                    :options="meshSizeLabel.lists"
                    @open="meshSizeLabel.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.meshdepthlabel')"
                  label-for="meshdepthlabel-filter"
                  v-show="avSearch"
                  v-if="isNets || isCompleted"
                >
                  <multiselect
                    id="meshdepthlabel-filter"
                    v-model="meshDepthLabel.selected"
                    :multiple="true"
                    label="description"
                    track-by="id"
                    :options="meshDepthLabel.lists"
                    @open="meshDepthLabel.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}, {'mr-sm-2': !avSearch}]"
                  :label="$t('dic.lengthlabel')"
                  label-for="lengthlabel-filter"
                  v-show="avSearch"
                  v-if="isNets || isCompleted"
                >
                  <multiselect
                    id="lengthlabel-filter"
                    v-model="lengthLabel.selected"
                    :multiple="true"
                    label="description"
                    track-by="id"
                    :options="lengthLabel.lists"
                    @open="lengthLabel.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-4' : avSearch}]"
                  :label="$t('dic.twineseries') + ' : '"
                  label-for="twineseries-filter"
                  v-show="avSearch"
                  v-if="isTwine"
                >
                  <multiselect
                    id="twineseries-filter"
                    v-model="twineSeries.selected"
                    :multiple="true"
                    :options="twineSeries.lists"
                    label="description"
                    track-by="id"
                    @open="twineSeries.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="['col-sm-6', {'col-md-4': !isTwine && (isNets || isCompleted)}]"
                  :label="$t('dic.productcolor') + ' : '"
                  label-for="productcolor-filter"
                  v-show="avSearch"
                  v-if="!mode"
                >
                  <multiselect
                    id="productcolor-filter"
                    v-model="productColor.selected"
                    :multiple="true"
                    :options="productColor.lists"
                    label="_label"
                    track-by="id"
                    @open="productColor.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="['col-sm-6', {'col-md-4': !isTwine && (isNets || isCompleted)}]"
                  :label="$t('dic.productcolorold') + ' : '"
                  label-for="productcolorold-filter"
                  v-show="avSearch"
                  v-if="mode"
                >
                  <multiselect
                    id="productcolorold-filter"
                    v-model="productColor.selected"
                    :multiple="true"
                    :options="productColor.listsOld"
                    label="_label"
                    track-by="code"
                    @open="productColor.loadData"
                  ></multiselect>
                </b-form-group>

                <b-form-group
                  :class="[{'col-sm-6 col-md-6' : avSearch}]"
                  :label="$t('dic.assemblytype') + ' : '"
                  label-for="assemblytype-filter"
                  v-show="avSearch"
                  v-if="isCompleted"
                >
                  <multiselect
                    id="assemblytype-filter"
                    v-model="assemblyType.selected"
                    :multiple="true"
                    :options="assemblyType.lists"
                    label="_label"
                    track-by="id"
                    @open="assemblyType.loadData"
                  ></multiselect>
                </b-form-group>
                <b-form-group
                  :class="['col-12', {'col-md-6': isCompleted && !isNets && !isTwine}]"
                  :label="$t('dic.selvage') + ' : '"
                  label-for="selvage-filter"
                  v-show="avSearch"
                  v-if="isNets || isCompleted"
                >
                  <multiselect
                    id="selvage-filter"
                    v-model="selvage.selected"
                    :multiple="true"
                    :options="selvage.lists"
                    label="description"
                    track-by="id"
                    @open="selvage.loadData"
                  ></multiselect>
                </b-form-group>
                <b-form-group
                  :class="['col-12', {'col-md-6': isTwine && !isNets && !isCompleted}]"
                  :label="$t('dic.customer') + ' : '"
                  label-for="customer-filter"
                  v-show="avSearch"
                >
                  <multiselect
                    id="customer-filter"
                    v-model="customer.selected"
                    :options="customer.lists"
                    label="_label"
                    track-by="id"
                    @open="customer.loadData"
                  ></multiselect>
                </b-form-group>
              </search>
            </template>
            <template v-slot:code="{item, itemIndex}">
              <span
                class="text-link"
                @click.prevent="openProductDetail(item)"
              >{{GetObjVal(item, 'code')}}</span>
              <b-tooltip
                :target="'productfind-code-' + itemIndex"
                placement="top"
                noninteractive
                v-if="GetObjVal(item, 'code')"
              >
                <span>{{GetObjVal(item, 'descriptionProd')}}</span>
                <br />
                <span>{{$t('dic.clickfordetails')}}</span>
              </b-tooltip>
            </template>

            <template v-slot:codeOld="{item, itemIndex}">
              <span
                class="text-link"
                @click.prevent="openProductDetail(item)"
              >{{GetObjVal(item, 'codeOld')}}</span>
              <b-tooltip
                :target="'productfind-codeOld-' + itemIndex"
                placement="top"
                noninteractive
                v-if="GetObjVal(item, 'codeOld')"
              >
                <span>{{GetObjVal(item, 'descriptionProd')}}</span>
                <br />
                <span>{{$t('dic.clickfordetails')}}</span>
              </b-tooltip>
            </template>
          </grid>
        </b-row>
      </b-col>

      <template v-slot:modal-footer="{cancel, ok}">
        <b-button @click="cancel">
          <span class="fa fa-times"></span>
          <span class="ml-2">{{$t('dic.cancel')}}</span>
        </b-button>
        <b-button @click="ok" variant="success" :disabled="!btnOk">
          <span class="fa fa-check"></span>
          <span class="ml-2">{{$t('dic.ok')}}</span>
        </b-button>
      </template>
    </b-modal>

    <productdetaildialog
      ref="productdetail"
      :isShowTab="false"
      v-model="modalProductDetail"
      :item="item"
    ></productdetaildialog>
  </div>
</template>

<script>
import dic from '@/shared/dic'
import { GetObjVal, GetObjArr, GetObjValJoin, ObjArrSort } from '@/shared/utils'
import productdetaildialog from '@/components/productdetaildialog'

export default {
  components: {
    productdetaildialog
  },
  i18n: {
    messages: {
      en: {
        dic: {
          productfind: 'Product Find',
          newproduct: 'New Product',
          oldproduct: 'Old Product'
        }
      },
      th: {
        dic: {
          productfind: 'หาสินค้า',
          newproduct: 'สินค้าใหม่',
          oldproduct: 'สินค้าเก่า'
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
    customerSet: {
      type: Object,
      default: null
    },
    productCategoryLists: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isNets: {
      cache: false,
      get() { return !!this.productCategoryLists.find(d => d.id == 'N') || !this.productCategoryLists.length }
    },
    isTwine: {
      cache: false,
      get() { return !!this.productCategoryLists.find(d => d.id == 'T') || !this.productCategoryLists.length }
    },
    isCompleted: {
      cache: false,
      get() { return !!this.productCategoryLists.find(d => d.id == 'P') || !this.productCategoryLists.length }
    },
    productTypeScopeLists() {
      return this.productCategoryLists.length ? this.productType.lists.filter(d => this.productCategoryLists.find(g => g.id == d.groupType)) : this.productType.lists
    }
  },
  data() {
    return {
      modal: false,
      data: [],
      btnOk: false,
      mode: true,
      avSearch: false,
      GetObjVal: GetObjVal,
      item: {},
      filter: {
        txtSearch: null,
        groupType: null,
        productType_ID: null,
        productQuality_ID: null,
        productTwineNo_ID: null,
        twineSeries_ID: null,
        assemblyType_ID: null,
        selvage_ID: null,
        customer_ID: null,
        mode: false
      },
      productType: {
        lists: [],
        selected: null,
        loadData: () => {
          this.$store.dispatch('product/productTypeLists').then(res => {
            this.productType.lists = res
            if (GetObjVal(this.productType.selected, 'length') && GetObjVal(this.productCategoryLists, 'length')) {
              this.productType.selected = this.productType.selected.filter(d => this.productCategoryLists.find(v => v.id == d.groupType))
            }
          })
        }
      },
      productQuality: {
        lists: [],
        selected: null,
        loadData: () => { this.$store.dispatch('product/productQualityLists').then(res => this.productQuality.lists = res) }
      },
      productTwineNo: {
        lists: [],
        selected: null,
        loadData: () => { this.$store.dispatch('product/productTwineNoLists').then(res => this.productTwineNo.lists = res) }
      },
      productColor: {
        lists: [],
        listsOld: [],
        selected: null,
        loadData: () => {
          this.$store.dispatch('product/productColorLists').then(res => {
            res.forEach(x => {
              x._label = GetObjValJoin(x, ['codeStd', 'description'])
              x.productColorOlds.forEach(d => {
                d._label = GetObjValJoin(d)
                this.productColor.listsOld.push(d)
              })
            })
            ObjArrSort(this.productColor.listsOld, 'code')
            this.productColor.lists = res
          })
        }
      },
      twineSeries: {
        lists: [],
        selected: null,
        loadData: () => { this.$store.dispatch('product/twineSeriesLists').then(res => this.twineSeries.lists = res) }
      },
      selvage: {
        lists: [],
        selected: null,
        loadData: () => { this.$store.dispatch('product/selvageLists').then(res => this.selvage.lists = res) }
      },
      assemblyType: {
        lists: [],
        selected: null,
        loadData: () => { this.$store.dispatch('product/assemblyTypeLists').then(res => this.assemblyType.lists = res) }
      },
      customer: {
        lists: [],
        selected: null,
        firstClicked: false,
        loadData: () => { this.$store.dispatch('setup/customerLists').then(res => this.customer.lists = res) }
      },
      fields: [
        {
          name: 'product',
          title: 'dic.product',
          visible: true,
          groups: [
            {
              name: 'code',
              title: 'dic.code',
              sortField: 'code',
              visible: true
            },
            {
              name: 'codeOld',
              title: 'dic.codeold',
              sortField: 'codeOld',
              visible: false
            },
            {
              name: 'descriptionSales',
              title: 'dic.labeldescription',
              sortField: 'descriptionSales',
              visible: true,
              tooltip: item => GetObjVal(item, 'nets.productSelvage.selvage.description')
            },
            {
              name: 'descriptionProd',
              title: 'dic.productiondescription',
              sortField: 'descriptionProd',
              visible: false
            }
          ]
        },
        {
          name: 'productQuality.code',
          title: 'dic.quality',
          sortField: 'productQuality.code',
          class: 'text-center',
          visible: true,
          tooltip: item => GetObjVal(item, 'productQuality.description')
        },
        {
          name: 'nets.assemblyType.codeStd',
          title: 'dic.assemblytype',
          sortField: 'nets.assemblyType.codeStd',
          class: 'text-center',
          visible: false,
          width: 110,
          tooltip: item => GetObjVal(item, 'nets.assemblyType.description')
        },
        {
          name: 'selvage',
          title: 'dic.selvage',
          visible: true,
          groups: [
            {
              name: 'nets.productSelvage.selvage.description',
              title: 'dic.description',
              sortField: 'nets.productSelvage.selvage.description',
              visible: true
            },
            {
              name: '_selvageProductColor._code',
              title: 'dic.color',
              sortField: '_selvageProductColor._code',
              class: 'text-center',
              visible: true,
              tooltip: item => GetObjVal(item, '_selvageProductColor.description')
            }
          ]
        }
      ],
      diameterLabel: {
        lists: [],
        loadData: () => { this.$store.dispatch('product/diameterLabelLists').then(res => this.diameterLabel.lists = res) },
        selected: null
      },
      meshSizeLabel: {
        lists: [],
        loadData: () => { this.$store.dispatch('product/meshSizeLabelLists').then(res => this.meshSizeLabel.lists = res) },
        selected: null
      },
      meshDepthLabel: {
        lists: [],
        loadData: () => { this.$store.dispatch('product/meshDepthLabelLists').then(res => this.meshDepthLabel.lists = res) },
        selected: null
      },
      lengthLabel: {
        lists: [],
        loadData: () => { this.$store.dispatch('product/lengthLabelLists').then(res => this.lengthLabel.lists = res) },
        selected: null
      },
      modalProductDetail: false
    }
  },
  methods: {
    onClick(e) {
      this.$emit('input', false)
      if (e) {
        const pd = this.$refs.grid.selected[this.$refs.grid.selected.length - 1]
        this.$root.api.ProductSearch({
          data: { id: GetObjArr(pd, 'id'), customer_ID: GetObjVal(this.customer.selected, 'id') },
          callback: res => {
            if (GetObjVal(res, 'length')) {
              this.$emit('ok', res[0])
            } else {
              this.$root.api.ProductSearch({
                data: { id: GetObjArr(pd, 'id') },
                callback: res => {
                  this.$emit('ok', res[0])
                }
              })
            }
          }
        })
      }
    },
    genData(x) {
      x._selvageProductColor = GetObjVal(x, 'nets.selvageProductColorOld') || GetObjVal(x, 'nets.selvageProductColor')
      if (x._selvageProductColor) x._selvageProductColor._code = x._selvageProductColor.codeStd || x._selvageProductColor.code
    },
    loadData() {
      this.filter.groupType = GetObjArr(this.productCategoryLists, 'id')
      this.filter.productType_ID = GetObjArr(this.productType.selected, 'id')
      this.filter.productColor_ID = GetObjArr(this.productColor.selected, 'id')
      this.filter.productQuality_ID = GetObjArr(this.productQuality.selected, 'id')
      this.filter.productTwineNo_ID = GetObjArr(this.productTwineNo.selected, 'id')
      this.filter.twineSeries_ID = GetObjArr(this.twineSeries.selected, 'id')
      this.filter.assemblyType_ID = GetObjArr(this.assemblyType.selected, 'id')
      this.filter.selvage_ID = GetObjArr(this.selvage.selected, 'id')
      this.filter.customer_ID = GetObjVal(this.customer.selected, 'id') // || GetObjVal(this.customerSet, 'id');

      this.filter.diameterLabel = GetObjArr(this.diameterLabel.selected, 'description')
      this.filter.meshSizeLabel = GetObjArr(this.meshSizeLabel.selected, 'description')
      this.filter.meshDepthLabel = GetObjArr(this.meshDepthLabel.selected, 'description')
      this.filter.lengthLabel = GetObjArr(this.lengthLabel.selected, 'description')

      this.filter.mode = this.mode
      this.$root.api.ProductSearchLight({
        data: this.filter,
        callback: res => {
          let isAssembly = false
          let isSelvage = false
          res.forEach(x => {
            this.genData(x)
            if (!isAssembly && GetObjVal(x, 'nets.assemblyType.codeStd')) {
              isAssembly = true
            }
            if (!isSelvage && GetObjVal(x, 'nets.productSelvage.selvage.description')) {
              isSelvage = true
            }
          })
          this.fields.find(v => v.name == 'nets.assemblyType.codeStd').visible = isAssembly
          this.fields.find(v => v.name == 'selvage').visible = isSelvage
          this.data = res
        }
      })
    },
    onRowSelected(e) {
      this.btnOk = e
    },
    modeClicked(val) {
      if (val != this.mode) {
        this.mode = val
        if (GetObjVal(this.productColor.selected, 'length')) {
          const tmp = []
          this.productColor.selected.forEach(d => {
            if (val) {
              tmp.push(this.productColor.listsOld.find(x => x.id == d.id))
            } else {
              tmp.push(this.productColor.lists.find(x => x.id == d.id))
            }
          })
          this.productColor.selected = tmp
        }
      }
    },
    openProductDetail(item) {
      this.item = { product: item }
      this.modalProductDetail = true
    }
  },
  watch: {
    value(val) {
      this.modal = val
      this.btnOk = false
      if (val) {
        setTimeout(() => { this.$refs.filter.focus() })
        this.productType.firstClicked = false
        this.productType.loadData()
        if (this.data.find(d => this.productCategoryLists.find(x => x.id != d.productType.groupType))) {
          this.data = []
        }
        if (this.customerSet) {
          this.customer.selected = this.customerSet
        }
      }
    },
    modal(val) {
      this.$emit('input', val)
    }
  }
}
</script>
