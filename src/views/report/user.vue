<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: Weekly Top Products -->
        <div class="col-span-12 mt-6">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">
              {{$t('report_user.title1')}}
            </h2>
			 <a
              href="javascript:;"
              class="ml-auto flex items-center text-theme-26 dark:text-theme-33"
              @click="onLoad"
            >
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> {{$t('dic.reload')}}
            </a>
          </div>
          <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
			  <div class="flex flex-col sm:flex-row sm:items-end xl:items-start  mt-5 ">
        <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
          <div class="sm:flex items-center sm:mr-4">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{$t('report_user.field')}}</label
            >
            <select
              id="tabulator-html-filter-field"
              v-model="filter.field"
              class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
            >
              <option value="qrcode">{{$t('report_user.qrcode')}}</option>
              <option value="product">{{$t('report_user.product')}}</option>
              <option value="orderno">{{$t('report_user.orderno')}}</option>
            </select>
          </div>
          <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{$t('report_user.type')}}</label
            >
            <select
              id="tabulator-html-filter-type"
              v-model="filter.type"
              class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
            >
              <option value="like" selected>like</option>
              <option value="=">=</option>
              <option value="<">&lt;</option>
              <option value="<=">&lt;=</option>
              <option value=">">></option>
              <option value=">=">>=</option>
              <option value="!=">!=</option>
            </select>
          </div>
          <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >{{$t('report_user.value')}}</label
            >
            <input
              id="tabulator-html-filter-value"
              v-model="filter.value"
              type="text"
              class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
              placeholder="Search..."
            />
          </div>
          <div class="mt-2 xl:mt-0">
            <button
              id="tabulator-html-filter-go"
              type="button"
              class="btn btn-primary w-full sm:w-16"
              @click="onFilter"
            >
              {{$t('button.go')}}
            </button>
            <button
              id="tabulator-html-filter-reset"
              type="button"
              class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
              @click="onResetFilter"
            >
              {{$t('button.reset')}}
            </button>
          </div>
        </form>
			  </div>
			<div id="productTb" ref="productRef" class="mt-8 table-report table-report--tabulator"></div>

		</div>
        </div>
        <!-- END: Weekly Top Products -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { number, dateDiff, GetDateTimeView, GetObjVal } from '@/shared/utils'
import xlsx from 'xlsx'
import feather from 'feather-icons'
import Tabulator from 'tabulator-tables'


export default defineComponent({
  components: {

  },
  setup() {
	const filter = reactive({
      field: 'qrcode',
      type: 'like',
      value: ''
    })
	const productRef = ref()
    const productTb = ref()

	// Redraw table onresize
    const reInitOnResizeWindow = () => {
      window.addEventListener('resize', () => {
        productTb.value.redraw()
        feather.replace({
          'stroke-width': 1.5
        })
      })
    }

    // Filter function
    const onFilter = () => {
	  // console.log(filter)
      productTb.value.setFilter(filter.field, filter.type, filter.value)
    }

    // On reset filter
    const onResetFilter = () => {
      filter.field = 'qrcode'
      filter.type = 'like'
      filter.value = ''
      onFilter()
    }

	// Export
    const onExportCsv = () => {
      tabulator.value.download('csv', 'data.csv')
    }

    const onExportJson = () => {
      tabulator.value.download('json', 'data.json')
    }

    const onExportXlsx = () => {
      const win = window
      win.XLSX = xlsx
      tabulator.value.download('xlsx', 'data.xlsx', {
        sheetName: 'Products'
      })
    }

    const onExportHtml = () => {
      tabulator.value.download('html', 'data.html', {
        style: true
      })
    }

    // Print
    const onPrint = () => {
      tabulator.value.print()
    }

    return {
      number,
      dateDiff,
      GetDateTimeView,
	  filter,
	  onFilter,
	  onResetFilter,
	  productTb,
	  reInitOnResizeWindow,
	  onExportCsv,
      onExportJson,
      onExportXlsx,
      onExportHtml,
      onPrint
    }
  },
  mounted () {
	this.initialTabulator()
	this.reInitOnResizeWindow()
    this.onLoad()

  },
  data () {
    return {
      product_registered: [],
	  fieldsProduct: [
		  {
            formatter: 'responsiveCollapse',
            width: 40,
            minWidth: 30,
            hozAlign: 'center',
            resizable: false,
            headerSort: false
          },
		  {
            title: this.$t('report_user.qrcode'),
            minWidth: 100,
            responsive: 0,
            field: 'qrcode',
            vertAlign: 'middle'
          },
		  {
            title: this.$t('report_user.product'),
            minWidth: 200,
            responsive: 0,
            field: 'product',
            vertAlign: 'middle'
          },
          {
            title: this.$t('registerqrcode.register_date'),
            minWidth: 100,
            field: 'register_date',
            hozAlign: 'center',
            vertAlign: 'middle',
			formatter(cell) {
				return GetDateTimeView(cell.getData().register_date)
			}
          },
          {
            title: this.$t('registerqrcode.orderno'),
            minWidth: 100,
            field: 'orderno',
            hozAlign: 'center',
            vertAlign: 'middle',
            print: false,
            download: false
          },
          {
            title: this.$t('registerqrcode.export_date'),
            minWidth: 100,
            field: 'export_date',
            hozAlign: 'center',
            vertAlign: 'middle',
			formatter(cell) {
				return GetDateTimeView(cell.getData().register_date)
			}
          },
          {
            title: this.$t('registerqrcode.location'),
            minWidth: 200,
            field: 'location',
            responsive: 1,
            hozAlign: 'left',
            vertAlign: 'middle'
          }
	  ]
    }
  },
  methods: {
      async onLoad() {
          this.product_registered = await this.getPRODUCTDetail()
      },
      getPRODUCTDetail() {
      return new Promise((resolve, reject) => {
        this.$root.api.ProductRegisterSearch({
          data: {
            mode: 'detail'
          },
          callback: res => {
            resolve(res)
          }
        })
      })
    },
	initialTabulator() {
		//Define Table
this.productTb = new Tabulator("#productTb", {
	layout:"fitColumns",
	tooltips:true,
	printAsHtml: true,
    printStyled: true,
	addRowPos:"top",
	history:true,
	pagination:"local",
	paginationSize: 10,
    paginationSizeSelector: [5,10, 20, 30, 40],
    responsiveLayout: 'collapse',
    placeholder: 'No matching records found',
	movableColumns:true,
	resizableRows:true,
	data:this.product_registered,
	initialSort:[
		{column:"qrcode", dir:"asc"},
	],
	columns: this.fieldsProduct,
});
	}
  },
  watch: {
	  product_registered(newVal, oldVal) {
      if (newVal) {
        this.initialTabulator()
      }
    },
  }
})
</script>
