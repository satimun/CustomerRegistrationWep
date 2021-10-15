<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-7">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">{{$t('dashboard_staff.title1')}}</h2>
            <a
              href="javascript:;"
              class="ml-auto flex items-center text-theme-26 dark:text-theme-33"
              @click="onLoad"
            >
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> {{$t('dic.reload')}}
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <CheckCircleIcon class="report-box__icon text-theme-21" />
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.register_pcqty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>
                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.register_pc')}}</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <FileTextIcon class="report-box__icon text-theme-22" />
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.orderno_qty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>

                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.order_qty')}}</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
					<i class="fas fa-user-check report-box__icon text-theme-23"></i>
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.registerid_qty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>

                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.registerid_qty')}}</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
					<i class="fas fa-qrcode report-box__icon text-theme-17"></i>
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.qrcode_qty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>

                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.qrcode_qty')}}</div>
                </div>
              </div>
            </div>
			<div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
					<i class="fas fa-barcode report-box__icon text-theme-21"></i>
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.barcode_qty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>

                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.barcode_qty')}}</div>
                </div>
              </div>
            </div>
			<div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <TruckIcon class="report-box__icon text-theme-10" />
                    <div class="ml-auto">
                      <div class="text-3xl font-medium leading-8">
                    <span v-if="volume_customer">{{number(volume_customer.ci_qty)}}</span>
                    <span v-else>0</span>
                  </div>
                    </div>
                  </div>

                  <div class="text-base text-gray-600 mt-1">{{$t('dashboard_staff.bc_progress')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->

      </div>
    </div>
    <div class="col-span-12 sm:col-span-12 xl:col-span-12 2xl:col-span-5">
      <div class="2xl:border-l border-theme-25 -mb-10 pb-10">
        <div class="2xl:pl-6 grid grid-cols-12 gap-6">
          <!-- BEGIN: Transactions -->
          <div
            class="col-span-12 md:col-span-12 xl:col-span-12 2xl:col-span-12 mt-3 2xl:mt-8"
          >
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">{{$t('dashboard_user.title2')}}</h2>
              <a
                href="/reportproduct"
                class="ml-auto text-theme-26 dark:text-theme-33 truncate"
                >{{$t('dic.more')}}</a
              >
            </div>
            <div class="mt-5">
              <div
                v-for="(item, id) in this.product_registered"
                :key="id"
                class="intro-x"
              >
                <div class="box px-5 py-3 mb-3">
                  <div class="flex items-center">
                      <div class="font-medium">
                        {{ item.qrcode }}
                      </div>
                      <div class="text-xs text-gray-500 ml-auto">{{ GetDateTimeView(item.register_date) }}</div>
                    </div>
                  <div class="flex items-center">
                  <div class="ml-4 mr-auto">
                    <div class="text-gray-800 mt-2 uppercase">
                      {{ item.member_name }}
                    </div>
					<div class="text-gray-700 mt-2">
                      {{ item.product }}
                    </div>
                    <div class="text-gray-600 mt-1.5">
                      {{ item.location }}
                    </div>
                  </div>
                  <div
                    class="text-theme-24"
                  >

                  </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          <!-- END: Transactions -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { number, dateDiff, GetDateTimeView } from '@/shared/utils'

export default defineComponent({
  setup() {
    onMounted(() => {
      cash('body')
        .removeClass('login')
        .removeClass('error-page')
        .addClass('main')
    })

    return {
      number,
      dateDiff,
      GetDateTimeView
    }
  },
  mounted () {
    this.onLoad()
  },
  data () {
    return {
      volume_customer: {
        register_baleqty: null,
        register_pcqty: null,
        register_pino: null,
        baleqty_inprogress: null,
        pcqty_inprogress: null,
        baleqty: null,
        pcqty: null
      },
      product_registered: []
    }
  },
  methods: {
    async onLoad() {
      var res = await this.getREGISTERPRODUCTCUS()
      var res2 = await this.getPRODUCTDetail()
      this.clear()
      if (res != null && res.length > 0) {
        this.volume_customer = res[0]
      }
      if (res2 != null) {
        this.product_registered = res2
        // console.log(this.product_registered)
      }
    },
    clear() {
      this.volume_customer = null
      this.product_registered = null
    },
    getREGISTERPRODUCTCUS() {
      return new Promise((resolve, reject) => {
        this.$root.api.DashboardSearch({
		  data: {
            mode: 'staff'
          },
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    getPRODUCTDetail() {
      return new Promise((resolve, reject) => {
        this.$root.api.ProductRegisterSearch({
          data: {
            mode: 'dashboardstaff'
          },
          callback: res => {
            resolve(res)
          }
        })
      })
    }
  }
})
</script>
