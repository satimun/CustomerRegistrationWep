<template>
  <div>
    <DarkModeSwitcher />
    <SwitchLanguage />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="h-10"
              :src="require(`@/assets/images/logokkf.png`)"
            />
            <span class="text-white text-lg ml-3">
              {{$t('config.title1')}} <span class="font-medium"> {{$t('config.title2')}}</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/illustration.svg`)"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              {{$t('signin.introInfo1')}} <br />
              {{$t('signin.introInfo2')}}
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500"
            >
              {{$t('signin.introInfo3')}}
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              {{$t('signin.subject')}}
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              {{$t('signin.introForm')}}
            </div>
            <form
                @submit.prevent="onSubmit"
                class="validate-form"
              >
            <div class="intro-x mt-8">
              <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.email')}}
                    <span class="sm:ml-auto mt-1 pl-1 text-xs text-red-600">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    placeholder="example@mail.com"
                    :class="{ 'form-control intro-x  py-2 px-3 border-gray-300 block mt-4': v$.form.email.$errors }"
                    v-model="form.email"
                  />

                </div>
                <template v-if="v$.form.email.$errors">
                    <div
                      v-for="(error, index) in v$.form.email.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>
                  </template>
                  <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.password')}}
                    <span class="sm:ml-auto mt-1 pl-1 text-xs text-red-600">*</span>
                  </label>
                  <input
                    id="form-password"
                    type="password"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Password"
                    v-model="form.password"
                  />
                </div>
                 <template v-if="v$.form.password.$errors">
                    <div
                      v-for="(error, index) in v$.form.password.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small> {{ error.$message }}</small>
                    </div>

                  </template>
            </div>
            <div
              class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
            >
              <div class="flex items-center mr-auto">
                <input
                  id="remember_me"
                  type="checkbox"
                  class="form-check-input border mr-2 hidden"
                  v-model="form.remember_me"
                  ref="remember_me"
                />
                <label class="cursor-pointer select-none hidden" for="remember_me"
                  >{{$t('signin.remember_me')}}</label
                >
              </div>
              <a href="javascript:;" @click="forgot">{{$t('signin.forgot_password')}}</a>
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full align-top"
                type="submit"
              >
                {{$t('button.login')}}
              </button>
            </div>
			<div
              class="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4"
            >
			<div class="flex items-center mr-auto">
				{{$t('signin.notmemer')}} <a href="javascript:;" @click="signup" class="text-theme-1 pl-2"> {{$t('signin.create_account')}}</a>
			</div>

			</div>
            <div
              class="intro-x mt-10 xl:mt-14 text-gray-700 dark:text-gray-600 text-center xl:text-left"
            >
              {{$t('signin.agree')}} <br />
              <a class="text-theme-17 dark:text-gray-300" href=""
                >{{$t('signin.term')}}</a
              >
              &
              <a class="text-theme-17 dark:text-gray-300" href=""
                >{{$t('signin.policy')}}</a
              >
            </div>
            </form>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import SwitchLanguage from '@/components/SwitchLanguage.vue'

import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import Toastify from 'toastify-js'
import { GetObjVal } from '@/shared/utils'

export default defineComponent({
  name: 'signin',
  components: {
    DarkModeSwitcher,
    SwitchLanguage
  },
  setup() {
    onMounted(() => {
      cash('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    })

    return { v$: useVuelidate() }
  },
  computed: {},
  mounted () {
    this.$root.api.OauthAccess({
      callback: res => {
        this.$localStorage.set('AccessToken', res.accessToken)
      }
    })
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        remember_me: false
      }
    }
  },
  validations () {
    return {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    }
  },
  methods: {
    async onSubmit () {
      this.v$.$touch()
      if (this.v$.$error) return false

      var res = await this.signin()
      console.log(res)
      if (res != null) {
        this.$localStorage.set('Token', res.token)
        this.$localStorage.set('User', res.username)
        this.$localStorage.set('UMail', res.email)
        this.$localStorage.set('UCode', res.code)
        this.$localStorage.set('UType', res.type)

        window.location.href = GetObjVal(this.$route.query, 'path', '/')
        Toastify({
          text: 'Login success!',
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#91C714',
          stopOnFocus: true,
          className: 'toastify-content'
        }).showToast()
      }
    },
    signin() {
      return new Promise((resolve, reject) => {
        this.$root.api.OauthLogin({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    signup() {
      this.$router.push('/signup')
    },
    forgot() {
      this.$router.push('/forgotpassword')
    }
  }
})
</script>
