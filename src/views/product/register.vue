<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">{{$t('registerqrcode.title1')}}</h2>
    </div>
    <div class="intro-y box grid grid-cols-12 gap-6 mt-5 px-5 border-b border-gray-200 dark:border-dark-5">
      <!-- BEGIN: qrcode input -->
      <div
        class="intro-y col-span-12 lg:col-span-12 m-2 p-1"
        v-if="!verified"
      >
        <!-- BEGIN: Form Layout -->
        <div class="intro-y p-1">
          <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
            <h2 class="font-medium text-base mr-auto">{{$t('registerqrcode.info1')}}</h2>
          </div>
          <div class="flex flex-col-reverse xl:flex-row flex-col pt-5">
            <div class="w-2/3 w-full">
              <div class="w-5/6 w-full">
                <label
                  for="update-qrscanpath"
                  class="form-label"
                >{{$t('registerqrcode.qrscanpath')}}
				<span class="sm:ml-auto mt-1 pl-2 pr-2 text-sm text-theme-17"> <i class="fas fa-qrcode report-box__icon text-theme-17"></i> {{form.qrcode}}</span>
				</label>
                <input
                  id="update-qrscanpath"
                  type="text"
                  :class="{ 'form-control': v$.form.qrscanpath.$errors }"
                  placeholder="Input text"
                  v-model="form.qrscanpath"
				  @blur="onQrScan(form.qrscanpath)" tabindex="0"
                />
                <template v-if="v$.form.qrscanpath.$errors">
                    <div
                      v-for="(error, index) in v$.form.qrscanpath.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>
                  </template>

			  </div>

              <div  class="mt-3 w-full">
                      <label for="update-location" class="form-label"
                        >{{$t('registerqrcode.location')}}</label
                      >
                      <input
                        id="update-location"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        v-model="form.location"
                      />

                    </div>
                    <div  class="mt-3 w-60">
                      <label for="update-gps_coordinate" class="form-label"
                        >{{$t('registerqrcode.coordinate')}}</label
                      >
                      <input
                        id="update-gps_coordinate"
                        type="text"
                        class="form-control"
                        placeholder="latitude , longitude"
                        v-model="form.gps_coordinate"
                        disabled
                      />

                    </div>
            </div>
            <div class="w-1/3 w-full pl-2">
              <QrCodeReader @onQrScan="onQrScan" />
              <div class="flex flex-col sm:flex-row items-center hidden">
                <label
                  for="update-qrcode"
                  class="form-label  w-full xl:w-60"
                >QR Code Dummy</label>
                <input
                  id="update-qrcode"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form.qrcode"
                />
                <button
                class="btn btn-outline-secondary w-full xl:w-32 mr-2 ml-2"
                @click="onDummy()"
              >
                Dummy
              </button>

              </div>
            </div>
          </div>
          <div class="intro-x mt-3 xl:mt-5 text-center xl:text-left">
                <button type="button" class="btn btn-primary py-2 px-3 w-full xl:w-32 xl:mr-3 align-top" @click="onSave()">
                  {{$t('button.save')}}
                </button>
                <button
                class="btn btn-outline-secondary py-2 px-3 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="onCancel()"
              >
                {{$t('button.cancel')}}
              </button>
                </div>

        </div>
        <!-- END: Form Layout -->

      </div>

      <!-- BEGIN: qrcode input -->

      <!-- BEGIN: qrcode verify -->
      <div
        class="intro-y col-span-12 lg:col-span-12 m-2 p-1"
        v-else
      >
        <div class="intro-y p-1">
          <div class="flex items-center sm:ml-auto mt-3 sm:mt-0 pb-5 -mx-5  px-5">
            <h2 class="intro-y text-2xl font-medium mt-10 text-center mr-auto">
              {{$t('registerqrcode.info2')}}
            </h2>
          </div>

          <div class="mt-3 w-60">
                <label
                  for="registered-qrcode"
                  class="form-label"
                >{{$t('registerqrcode.qrcode')}}</label>
                <input
                  id="registered-qrcode"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.qrcode"
                  disabled
                />

              </div>

              <div class="mt-3 w-60">
                <label
                  for="registered-orderno"
                  class="form-label"
                >{{$t('registerqrcode.orderno')}}</label>
                <input
                  id="registered-orderno"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.orderno"
                  disabled
                />

              </div>

              <div class="mt-3">
                <label
                  for="registered-product"
                  class="form-label"
                >{{$t('registerqrcode.product')}}</label>
                <input
                  id="registered-product"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.product"
                  disabled
                />

              </div>

              <div class="mt-3 w-60">
                <label
                  for="registered-export_date"
                  class="form-label"
                >{{$t('registerqrcode.export_date')}}</label>
                <input
                  id="registered-export_date"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.export_date"
                  disabled
                />

              </div>

              <div class="mt-3 w-60">
                <label
                  for="registered-create_date"
                  class="form-label"
                >{{$t('registerqrcode.register_date')}}</label>
                <input
                  id="registered-create_date"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.create_date"
                  disabled
                />

              </div>

              <div class="mt-3 w-60">
                <label
                  for="registered-location"
                  class="form-label"
                >{{$t('registerqrcode.location')}}</label>
                <input
                  id="registered-location"
                  type="text"
                  class="form-control"
                  placeholder="Input text"
                  v-model="form2.location"
                  disabled
                />

              </div>

               <div class="intro-x mt-3 xl:mt-5 text-center xl:text-left">
                <button type="button" class="btn btn-primary py-2 px-3 w-full xl:w-32 xl:mr-3 align-top" @click="onOK()">
                   {{$t('button.ok')}}
                </button>
                </div>

        </div>
      </div>

      <!-- BEGIN: qrcode verify -->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import QrCodeReader from '@/components/QrCodeReader.vue'

export default defineComponent({
  name: 'profile',
  components: {
    QrCodeReader
  },
  props: {
    qrcode: {
      type: String,
      required: false
    }
  },
  setup () {
    onMounted(() => {
      cash('body')
        .removeClass('login')
        .removeClass('error-page')
        .addClass('main')
    })

    return {
      v$: useVuelidate()
    }
  },

  computed: {
    avatar () {
      return this.form && this.publicPath + this.form.picture_path ? this.form.picture_path : this.imgPath
    },
    coordinates () {
      return this.location ? this.location.latitude + ' , ' + this.location.longitude : ''
    }

  },

  mounted () {
    this.getGeolocation()
    // console.log(this.qrcode)
    if (this.qrcode) {
      this.autoSave()
    }
  },

  data () {
    return {
      verified: false,
      form: {
        qrcode: '',
        qrscanpath: '',
        gps_coordinate: this.coordinates,
        location: ''
      },
      form2: {
        qrcode: '',
        qrscanpath: '',
        orderno: '',
        prodcode: '',
        proddesc: '',
        export_date: '',
        gps_coordinate: '',
        location: '',
        cuscode: '',
        member_id: '',
        product: ''
      }
    }
  },

  methods: {
    onQrScan (data) {
      // console.log('onQrScan', data)
      this.form.qrscanpath = data
      if (data != null) {
        this.form.qrcode = this.getQrCode(data)
      }
    },
    validQrScan (data) {
      // console.log('validQrScan', data)
      if (!this.validQrCodeScanPath(data)) {
        this.$root.AlertMessage('F', 'Invalid QR scan path.')
      }
    },
    autoSave () {
      // console.log(this.qrcode)
      this.form.qrscanpath = this.qrcode
      this.getGeolocation()
      this.form.gps_coordinate = this.coordinates
      this.onSave()
    },
    async onSave () {
      this.v$.form.$touch()
      if (this.v$.form.$error) return false
      var res = await this.registerQrCode()
      if (res) {
        this.verified = true
        this.form2 = res
        this.$root.AlertMessage('S', 'Successfully.')
      }
    },
    async onDummy () {
      if (this.form.qrcode != null && this.form.qrcode.length > 0) {
        var res = await this.createDummy()
        if (res) {
          this.$root.AlertMessage('S', 'A Qr code dummy created.')
        }
      } else {
        this.$root.AlertMessage('F', 'Invalid qr code.')
      }
    },
    onCancel () {
      this.clearForm()
    },
    onOK () {
      this.clearForm()
      this.clearForm2()
    },
    clearForm () {
      this.verified = false
      this.form.qrscanpath = ''
      this.form.qrcode = ''
      this.getGeolocation()
      this.form.gps_coordinate = this.coordinates
      this.form.location = ''
    },
    clearForm2 () {
      this.verified = false
      this.form2.qrscanpath = ''
      this.form2.qrcode = ''
      this.form2.gps_coordinate = ''
      this.form2.orderno = ''
      this.form2.location = ''
      this.form2.prodcode = ''
      this.form2.proddesc = ''
      this.form2.export_date = ''
      this.form2.cuscode = ''
      this.form2.member_id = ''
      this.form2.product = ''
    },
    createDummy() {
      return new Promise((resolve, reject) => {
        this.$root.api.QRCodeDummy({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    registerQrCode() {
      return new Promise((resolve, reject) => {
        this.$root.api.QRCodeSave({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    }
  },
  watch: {
    coordinates (newVal, oldVal) {
      if (newVal) {
        this.getGeolocation()
        this.form.gps_coordinate = this.coordinates
      }
    },
    qrcode (newVal, oldVal) {
      if (newVal) {
        this.autoSave()
      }
    }
  },
  validations () {
    return {
      form: {
        qrscanpath: {
          required,
          validpath: helpers.withMessage(('QR scan path invalid'), (qrscanpath) => {
            return this.validQrCodeScanPath(qrscanpath)
          })
        }

      }
    }
  }
})
</script>
