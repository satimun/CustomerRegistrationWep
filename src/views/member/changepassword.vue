<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Change Password</h2>
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
                {{ this.fullname }}
              </div>
              <div class="text-gray-600">{{ this.email }}</div>
            </div>

          </div>
          <div class="p-5 border-t border-gray-200 dark:border-dark-5">
            <a
              class="flex items-center"
              href="/profile"
            >
              <SettingsIcon class="w-4 h-4 mr-2" /> Personal Information
            </a>
            <a class="flex items-center mt-5 hidden" href="/registerqrcode">
              <EditIcon class="w-4 h-4 mr-2" /> Register KKF Product
            </a>
            <a class="flex items-center mt-5 text-theme-17 dark:text-gray-300 font-medium" href="javascript:;">
              <LockIcon class="w-4 h-4 mr-2" /> Change Password
            </a>

          </div>
        </div>
      </div>
      <!-- END: Profile Menu -->
      <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
        <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
          <div
            class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
          >
            <h2 class="font-medium text-base mr-auto">Change Password</h2>
          </div>
          <div class="p-5">
            <div>
              <label for="change-password-form-1" class="form-label"
                >Old Password</label
              >
              <input
                id="change-password-form-1"
                type="password"
                class="form-control"
                placeholder="Input text"
                v-model="form.oldpass"
              />
              <template v-if="v$.form.oldpass.$errors">
                    <div
                      v-for="(error, index) in v$.form.oldpass.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small v-if="error.$message"> {{ error.$message }}</small>
                    </div>

                  </template>
            </div>
            <div class="mt-3">
              <label for="change-password-form-2" class="form-label"
                >New Password</label
              >
              <input
                id="change-password-form-2"
                type="password"
                class="form-control"
                placeholder="Input text"
                v-model="form.password"
              />
              <template v-if="v$.form.password.$errors">
                    <div
                      v-for="(error, index) in v$.form.password.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small v-if="error.$message"> {{ error.$message }}</small>
                     <small v-else>{{$t('signup.goodPassword')}} </small>
                    </div>

                  </template>
            </div>
            <div class="mt-3">
              <label for="change-password-form-3" class="form-label"
                >Confirm New Password</label
              >
              <input
                id="change-password-form-3"
                type="password"
                class="form-control"
                placeholder="Input text"
                v-model="form.confpass"
              />
               <template v-if="v$.form.confpass.$errors">
                    <div
                      v-for="(error, index) in v$.form.confpass.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small>{{ error.$message }}</small>
                    </div>
                  </template>
            </div>
            <button type="button" class="btn btn-primary mt-4" @click="onSubmit">
              Change Password
            </button>
          </div>
        </div>
        <!-- END: Change Password -->
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from '@/store'

import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'

export default defineComponent({
  name: 'profile',
  setup() {
    const store = useStore()
    const userAvatar = computed(() => store.state.user.userPicture)

    const switchAvatar = (picture) => {
      store.dispatch('user/setPicture', picture)
    }

    onMounted(() => {
      cash('body')
        .removeClass('login')
        .removeClass('error-page')
        .addClass('main')
    })

    return {
      v$: useVuelidate(),
      userAvatar,
      switchAvatar
    }
  },

  computed: {
    avatar() {
      return this.picture_path ? this.publicPath + this.picture_path : this.imgPath
    }
  },

  mounted () {
    this.profile()
  },

  data () {
    return {
      fullname: '',
      email: '',
      picture_path: '',
      form: {
        password: '',
        confpass: '',
        oldpass: ''
      },
      passfocus: false,
      lower: false,
      upper: false,
      number: false,
      length: false,
      vsuccess: false
    }
  },

  validations () {
    return {
      form: {
        password: {
          required,
          minLength: minLength(8),
          goodPassword: helpers.withMessage('ต้องประกอบด้วย [a-z] , [A-Z] , [0-9] ยาวอย่างน้อย 8 ตัวอักษร', (password) => {
            return (password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password))
          })

        },
        confpass: {
          required,
          sameAs: sameAs(this.form.password)
        },
        oldpass: {
          required
        }
      }
    }
  },

  methods: {
    async profile() {
      var res = await this.getProfile()
      if (res) {
        this.fullname = res.fullname
        this.email = res.email
        this.picture_path = res.picture
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
    async onSubmit () {
      this.v$.$touch()
      if (this.v$.$error) return false
      var res = await this.changepassword()
      if (res != null) {
        this.$root.AlertMessage('S', 'Success')
      }
    },
    changepassword() {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberChangePassword({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    }

  }
})
</script>
