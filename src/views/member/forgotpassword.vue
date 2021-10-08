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
              class="w-6"
              :src="require(`@/assets/images/logokkf.png`)"
            />
            <span class="text-white text-lg ml-3">
              {{$t('forgotpassword.title1')}} <span class="font-medium"> {{$t('forgotpassword.title2')}}</span>
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
              {{$t('forgotpassword.introInfo1')}} <br />
              {{$t('forgotpassword.introInfo2')}}
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500"
            >
              {{$t('forgotpassword.introInfo3')}}
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0"  v-if="!resetpass">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              {{$t('forgotpassword.subject')}}
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              {{$t('forgotpassword.introForm')}}
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

            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-40 xl:mr-3 align-top"
                type="submit"
                @click="onSubmit"
              >
                {{$t('button.resetpassword')}}
              </button>
              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                 @click="signin"
              >
                {{$t('button.signin')}}
              </button>
            </div>
            </form>
          </div>
        </div>
        <!-- END: Login Form -->

        <!-- BEGIN: Reset Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0"  v-else>
            <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              {{$t('forgotpassword.subject2')}}
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              {{$t('forgotpassword.introForm')}}
            </div>
            <form
                @submit.prevent="onReset"
                class="validate-form"
              >
            <div class="intro-x mt-8">
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
                    v-model="form2.password"
                  />
                </div>
                 <template v-if="v$.form2.password.$errors">
                    <div
                      v-for="(error, index) in v$.form2.password.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small v-if="error.$message"> {{ error.$message }}</small>
                     <small v-else>{{$t('signup.goodPassword')}} </small>
                    </div>

                  </template>

                  <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.confirmpass')}}
                    <span class="sm:ml-auto mt-1 pl-1 text-xs text-red-600">*</span>
                  </label>
                  <input
                    id="form-confirmpass"
                    type="password"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    :placeholder="$t('signup.confirmpass')"
                    v-model="form2.confirmpass"
                  />

                </div>
                <template v-if="v$.form2.confirmpass.$errors">
                    <div
                      v-for="(error, index) in v$.form2.confirmpass.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small>{{ error.$message }}</small>
                    </div>
                  </template>

                  <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                type="submit"
                @click="onReset"
              >
                {{$t('button.resetpassword')}}
              </button>
              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                 @click="signin"
              >
                {{$t('button.signin')}}
              </button>
            </div>

            </div>
            </form>
            </div>

        </div>
        <!-- END: Reset Form -->

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import SwitchLanguage from '@/components/SwitchLanguage.vue'

import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

export default defineComponent({
  name: 'forgotpassword',
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
  computed: {
    resetpass() {
      return this.$route.query.token != undefined
    }
  },
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
        email: ''
      },
      form2: {
        password: '',
        confirmpass: '',
        token: this.$route.query.token

      },
      passfocus: false,
      lower: false,
      upper: false,
      number: false,
      length: false
    }
  },
  validations () {
    return {
      form: {
        email: {
          required,
          email
        }
      },
      form2: {
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
        confirmpass: {
          required,
          sameAs: sameAs(this.form2.password)
        }

      }
    }
  },
  methods: {
    async onSubmit () {
      this.v$.form.$touch()
      if (this.v$.form.$error) return false

      var res = await this.forgotpassword()
      if (res != null) {
        this.$root.AlertMessage('W', this.$t('forgotpassword.warntext'))
      }
    },
    forgotpassword() {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberReqPassword({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    signin() {
      this.$router.push('/Signin')
    },
    async onReset() {
      this.v$.form2.$touch()
      if (this.v$.form2.$error) return false
      var res = await this.resetpassword()
      if (res != null) {
        this.$root.AlertMessage('S', this.$t('forgotpassword.success'))
        this.$router.push('/signin')
      }
    },
    resetpassword() {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberResetPassword({
          data: this.form2,
          callback: res => {
            resolve(res)
          }
        })
      })
    }
  }
})
</script>
