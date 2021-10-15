<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Profile</h2>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <!-- BEGIN: Profile Menu -->
      <div
        class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse"
      >
        <div class="intro-y box mt-5">
          <div class="relative flex items-center p-5">
            <div class="w-12 h-12 image-fit">
              <img
                alt="Profile picture"
                class="rounded-full"
                :src="`${avatar}`"
                @error="imageUrlAlt"
              />
            </div>
            <div class="ml-4 mr-auto">
              <div class="font-medium text-base">
                {{ this.userName }}
              </div>
              <div class="text-gray-600">{{ this.userEmail }}</div>
            </div>
          </div>
          <div class="p-5 border-t border-gray-200 dark:border-dark-5">
            <a
              class="flex items-center text-theme-17 dark:text-gray-300 font-medium"
              href=""
            >
              <SettingsIcon class="w-4 h-4 mr-2" /> Personal Information
            </a>
            <a class="flex items-center mt-5 hidden" href="/registerqrcode" v-show="!this.isStaff()">
              <EditIcon class="w-4 h-4 mr-2" /> Register KKF Product
            </a>
            <a class="flex items-center mt-5" href="/changepassword">
              <LockIcon class="w-4 h-4 mr-2" /> Change Password
            </a>

          </div>

        </div>
      </div>
      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div class="intro-y box p-5 lg:mt-5">
              <div
                class="boxed-tabs nav nav-tabs justify-center w-4/5 bg-gray-200 text-gray-600 dark:bg-dark-1 dark:text-gray-500 rounded-md mx-auto"
                role="tablist"
              >
                <a
                  id="personal-users-tab"
                  data-toggle="tab"
                  data-target="#personal-users"
                  href="javascript:;"
                  class="btn flex-1 border-0 shadow-none py-1.5 px-2 active"
                  role="tab"
                  aria-controls="personal-users"
                  aria-selected="true"
                  >Personal</a
                >
                <a
                  id="address-users-tab"
                  data-toggle="tab"
                  data-target="#address-users"
                  href="javascript:;"
                  class="btn flex-1 border-0 shadow-none py-1.5 px-2"
                  role="tab"
                  aria-selected="false"
                  >Address</a
                >
                 <a
                  id="social-users-tab"
                  data-toggle="tab"
                  data-target="#social-users"
                  href="javascript:;"
                  class="btn flex-1 border-0 shadow-none py-1.5 px-2"
                  role="tab"
                  aria-selected="false"
                  >Social Networks</a
                >
              </div>
              <div class="tab-content mt-6">
                <div
                  id="personal-users"
                  class="tab-pane active"
                  role="tabpanel"
                  aria-labelledby="personal-users-tab"
                >
                 <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Personal Information</h2>
          </div>
          <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 2xl:col-span-6">
                    <div>
                      <label for="update-profile-email" class="form-label"
                        >{{$t('signup.email')}}</label
                      >
                      <input
                        id="update-profile-email"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                         v-model="form.email"
                        disabled
                      />
                      <template v-if="v$.form.email.$errors">
                    <div
                      v-for="(error, index) in v$.form.email.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>
                  </template>
                    </div>
                    <div  class="mt-3">
                      <label for="update-profile-first_name" class="form-label"
                        >{{$t('signup.first_name')}}</label
                      >
                      <input
                        id="update-profile-first_name"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                         v-model="form.first_name"
                      />
                       <template v-if="v$.form.first_name.$errors">
                    <div
                      v-for="(error, index) in v$.form.first_name.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>
                  </template>
                    </div>
                    <div  class="mt-3">
                      <label for="update-profile-last_name" class="form-label"
                        >{{$t('signup.last_name')}}</label
                      >
                      <input
                        id="update-profile-last_name"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        v-model="form.last_name"
                      />
                      <template v-if="v$.form.last_name.$errors">
                    <div
                      v-for="(error, index) in v$.form.last_name.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>
                  </template>
                    </div>
                     <div class="mt-3">
                      <label for="update-profile-birth_date" class="form-label"
                        >Birth date</label
                      >
                      <div class="relative mx-auto">
                <div
                  class="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 border text-gray-600 dark:bg-dark-1 dark:border-dark-4"
                >
                  <CalendarIcon class="w-4 h-4" />
                </div>
                <Litepicker
                  v-model="form.birth_date"
                  :options="{
                    autoApply: true,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1900,
                      maxYear: null,
                      months: true,
                      years: true
                    },
                    maxDate: moment(),
					format:'YYYY-MM-DD'
                  }"
                  class="form-control pl-12"
                />
              </div>
                    </div>

                  </div>
                  <div class="col-span-12 2xl:col-span-6">
                    <div class="mt-3 2xl:mt-0">
                      <label for="update-profile-mobile_no" class="form-label"
                        >{{$t('signup.mobile_no')}}</label
                      >
                      <input
                        id="update-profile-mobile_no"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        v-model="form.mobile_no"
                      />

                    </div>
                    <div class="mt-3">
                      <label for="update-profile-location" class="form-label"
                        >{{$t('signup.location')}}</label
                      >
                      <input
                        id="update-profile-location"
                        type="text"
                        class="form-control"
                        placeholder="Input text"
                        v-model="form.location"
                      />

                    </div>
                    <div class="mt-3">
                      <label for="update-profile-shipowner_amt" class="form-label"
                        >{{$t('signup.shipowner_amt')}}</label
                      >
                      <input
                        id="update-profile-shipowner_amt"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="Input text"
                        v-model="form.shipowner_amt"
                      />
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-shipusekkfnet_amt" class="form-label"
                        >{{$t('signup.shipusekkfnet_amt')}}</label
                      >
                      <input
                        id="update-profile-shipusekkfnet_amt"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="Input text"
                         v-model="form.shipusekkfnet_amt"
                      />
                    </div>
                  </div>

                </div>
                <button type="button" class="btn btn-primary w-20 mt-3" @click="onSave()">
                  Save
                </button>
              </div>
              <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                <div
                  class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5"
                >
                  <div
                    class="h-40 relative image-fit cursor-pointer zoom-in mx-auto"
                  >
                    <img
                      class="rounded-md"
                      alt="Profile Picture"
                      :src="`${avatar}`"
                      @error="imageUrlAlt"
                    />
                    <Tippy
                      tag="div"
                      content="Remove this profile photo?"
                      class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-24 right-0 top-0 -mr-2 -mt-2"
                      @click="form.picture_path = '';DeletePicture()"
                      v-if="form.picture_path && form.picture_path.length > 0"
                    >
                      <xIcon class="w-4 h-4" />
                    </Tippy>
                  </div>
                  <div class="mx-auto cursor-pointer relative mt-5">
                    <button type="button" class="btn btn-primary w-full">
                      Change Photo
                    </button>
                    <input
                      type="file"
                      class="w-full h-full top-0 left-0 absolute opacity-0"
                      @change="PictureChange"
                      accept="image/jpeg, image/png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Display Information -->
                </div>
                <div
                  id="address-users"
                  class="tab-pane"
                  role="tabpanel"
                  aria-labelledby="address-users-tab"
                >
<!-- BEGIN: Address Information -->
        <div class="intro-y box mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Address Information</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-x-5">
              <div class="col-span-12">
                    <div class="mt-0">
                      <label for="update-profile-address_line1" class="form-label"
                        >Address 1</label
                      >
                      <textarea
                        id="update-profile-address_line1"
                        class="form-control"
                        placeholder="Adress"
                         v-model="form.address_line1"
                      ></textarea
                      >
                    </div>
                    <div class="mt-3">
                      <label for="update-profile-address_line2" class="form-label"
                        >Address 2</label
                      >
                      <textarea
                        id="update-profile-address_line2"
                        class="form-control"
                        placeholder="Adress"
                        v-model="form.address_line2"
                      ></textarea
                      >
                    </div>
                  </div>
              <div class="col-span-12 xl:col-span-6">
                <div class="mt-3">
                  <label for="update-profile-city" class="form-label"
                    >City</label
                  >
                  <input
                    id="update-profile-city"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.city"
                  />
                </div>
                <div class="mt-3">
                  <label for="update-profile-postal_code" class="form-label"
                    >Postal code</label
                  >
                  <input
                    id="update-profile-postal_code"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.postal_code"
                  />
                </div>

              </div>
              <div class="col-span-12 xl:col-span-6">
                <div class="mt-3 xl:mt-3">
                  <label for="update-profile-country_id" class="form-label"
                    >Country </label
                  >
						<TomSelect
                    v-model="form.country_id"
                    :options="{
                      placeholder: 'ระบุ'
                    }"
                    class="w-full"
                  >
				    <option disabled :value="null">ระบุ</option>
                    <option :value="item.id" v-for="(item, id) in CountryList" :key="id">{{item.description}}</option>

                  </TomSelect>

                </div>
                <div class="mt-3">
                  <label for="update-profile-gps_coordinate" class="form-label"
                    >GPS coordinate</label
                  >
                  <input
                    id="update-profile-gps_coordinate"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.gps_coordinate"
                  />
                </div>

              </div>
            </div>
            <div class="flex justify-end mt-4">
              <button type="button" class="btn btn-primary w-20 mr-auto" @click="onSave()">
                Save
              </button>

            </div>
          </div>
        </div>
        <!-- END: Address Information -->
                </div>
                <div
                  id="social-users"
                  class="tab-pane"
                  role="tabpanel"
                  aria-labelledby="social-users-tab"
                >
<!-- BEGIN: Social Networks  Information -->
        <div class="intro-y box mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Social Networks Information</h2>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-12 gap-x-5">
              <div class="col-span-12 xl:col-span-6">
                <div>
                  <label for="update-profile-line" class="form-label"
                    >Line</label
                  >
                  <input
                    id="update-profile-line"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.line"
                  />
                </div>
                <div class="mt-3">
                  <label for="update-profile-ig" class="form-label"
                    >Instargram</label
                  >
                  <input
                    id="update-profile-ig"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.ig"
                  />
                </div>

              </div>
              <div class="col-span-12 xl:col-span-6">
                <div class="mt-3 xl:mt-0">
                  <label for="update-profile-facebook" class="form-label"
                    >Facebook</label
                  >
                  <input
                    id="update-profile-facebook"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.facebook"
                  />
                </div>
                <div class="mt-3">
                  <label for="update-profile-twitter" class="form-label"
                    >Twitter</label
                  >
                  <input
                    id="update-profile-twitter"
                    type="text"
                    class="form-control"
                    placeholder="Input text"
                    v-model="form.twitter"
                  />
                </div>

              </div>
            </div>
            <div class="flex justify-end mt-4">
              <button type="button" class="btn btn-primary w-20 mr-auto" @click="onSave()">
                Save
              </button>

            </div>
          </div>
        </div>
        <!-- END: Social Networks Information -->
                </div>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useStore } from '@/store'

import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { FileToBase64, GetObjValJoin, GetObjVal } from '@/shared/utils'

export default defineComponent({
  name: 'profile',
  setup() {
    const select = ref('1')
    const store = useStore()
    const userAvatar = computed(() => store.state.user.userPicture)
    const userCode = computed(() => store.state.user.userCode)
    const userName = computed(() => store.state.user.userName)
    const userEmail = computed(() => store.state.user.userEmail)
    const userType = computed(() => store.state.user.userType)

    const switchProfile = (user) => {
      // console.log(user)
      if (user) {
        store.dispatch('user/setCode', user.code)
        store.dispatch('user/setName', user.fullname)
        store.dispatch('user/setEmail', user.email)
        store.dispatch('user/setType', user.type)
      }
    }

    const setUserAvatar = () => {
      userAvatar.value || ''
    }

    const switchAvatar = (picture) => {
      store.dispatch('user/setPicture', picture)
      setUserAvatar()
    }

    onMounted(() => {
      setUserAvatar()
      cash('body')
        .removeClass('login')
        .removeClass('error-page')
        .addClass('main')
    })

    return {
      select,
      v$: useVuelidate(),
      userAvatar,
      switchAvatar,
      userCode,
      userName,
      userEmail,
      userType,
      switchProfile
    }
  },

  computed: {
    avatar() {
      return this.form && this.form.picture_path ? this.publicPath + this.form.picture_path : this.imgPath
    }
  },

  mounted () {
	this.initiail()
    this.profile()
  },

  data () {
    return {
      fullname: '',
      email: '',
      form: {
        first_name: '',
        last_name: '',
        mobile_no: '',
        location: '',
        shipowner_amt: null,
        shipusekkfnet_amt: null,
        picture_path: null,
        email: '',
        birth_date: '',
        gender: '',
        address_line1: '',
        address_line2: '',
        city: '',
        country_id: '',
        postal_code: '',
        line: '',
        facebook: '',
        ig: '',
        twitter: ''
      },
      CountryOptions: {
        lists: [],
        selected: null
      },
      country: '',
	  CountryList : []
    }
  },

  validations () {
    return {
      form: {
        email: {
          required,
          email
        },
        first_name: {
          required
        },
        last_name: {
          required
        }
      }
    }
  },

  methods: {
    async profile() {
      var res = await this.getProfile()
      this.switchProfile(res)
      // console.log(res)
      if (res) {
        this.fullname = res.fullname
        this.email = res.email

        var data = res.member
        if (data == null) return

        this.form.first_name = data.first_name
        this.form.last_name = data.last_name
        this.form.mobile_no = data.mobile_no
        this.form.location = data.location
        this.form.shipowner_amt = data.shipowner_amt
        this.form.shipusekkfnet_amt = data.shipusekkfnet_amt
        this.form.picture_path = data.picture_path
        this.form.email = data.email
        this.form.data = data.birth_date
        this.form.gender = data.gender
        this.form.address_line1 = data.address_line1
        this.form.address_line2 = data.address_line2
        this.form.city = data.city
        this.form.country_id = data.country_id
        this.form.postal_code = data.postal_code
        this.form.line = data.line
        this.form.facebook = data.facebook
        this.form.ig = data.ig
        this.form.twitter = data.twitter
      }
    },
    getProfile() {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberGet({
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    async PictureChange(e) {
      if (e.target.files.length) {
        const file = e.target.files[0]
        if (file && (/^image[/]jpeg/.test(file.type) || /^image[/]png/.test(file.type))) {
          var pic = await FileToBase64(file)
          var res = await this.onChangePicture(pic)
          if (res != null) {
            this.form.picture_path = res
            this.switchAvatar(res)
          }
          // console.log(this.form.picture_path)

          this.$root.AlertMessage('S', 'Picture Changed.')
        } else {
          this.$root.AlertMessage('F', 'Invalid file format.')
        }
      }
    },
    onChangePicture(pic) {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberChangePicture({
          data: { picture_path: pic },
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    DeletePicture() {
      this.$root.api.MemberChangePicture({
        data: { picture_path: null },
        callback: res => {
          this.form.picture_path = res
          this.userAvatar = res
          this.switchAvatar(res)
          this.$root.AlertMessage('S', 'Picture Deleted.')
        }
      })
    },
    async onSave() {
      this.v$.$touch()
      if (this.v$.$error) return false
      var res = await this.updateProfile()
      this.switchProfile(res)
      this.$root.AlertMessage('S', 'Profile updated.')
    },
    updateProfile() {
	  // console.log('updateProfile',this.form)
      return new Promise((resolve, reject) => {
        this.$root.api.MemberUpdate({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    getCountry() {
      return new Promise((resolve, reject) => {
        this.$root.api.CountrySearch({
          callback: res => {
            if (res) {
              res.forEach(x => {
                x._label = GetObjValJoin(x, ['countrycode', 'desc1'])
              })
            }
            resolve(res)
          }
        })
      })
    },
    async initiail() {
      this.CountryList = await this.getCountry()
    },
    setCountryId () {
      console.log(this.country, this.CountryOptions)
      this.form.country_id = this.CountryOptions.selected ? this.CountryOptions.selected.countrycode : ''
    }
  }
})
</script>
