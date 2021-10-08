<template>
  <div>
    <DarkModeSwitcher />
    <SwitchLanguage />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a
            href=""
            class="-intro-x flex items-center pt-5"
          >
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="w-6"
              :src="require(`@/assets/images/logokkf.png`)"
            />
            <span class="text-white text-lg ml-3">
              {{$t('signup.title1')}} <span class="font-medium"> {{$t('signup.title2')}}</span>
            </span>

          </a>
          <div class="my-auto">
            <img
              alt="Icewall Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              :src="require(`@/assets/images/illustration.svg`)"
            />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              {{$t('signup.introInfo1')}} <br />
              {{$t('signup.introInfo2')}}
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-gray-500">
              {{$t('signup.introInfo3')}}
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0" v-show="!verify">
          <div class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
              {{$t('signup.subject')}}
            </h2>
            <div class="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center">
              {{$t('signup.introForm')}}
            </div>
            <div class="intro-x mt-4">
              <form
                @submit.prevent="onSubmit"
                class="validate-form"
              >
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
                  >{{$t('signup.first_name')}}
                    <span class="sm:ml-auto mt-1 pl-1 text-xs text-red-600">*</span>
                  </label>
                  <input
                    id="form-first_name"
                    type="text"
                    class="form-control  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="First Name"
                    v-model="form.first_name"
                  />
                </div>
                <template v-if="v$.form.first_name.$errors">
                    <div
                      v-for="(error, index) in v$.form.first_name.$errors"
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
                  >{{$t('signup.last_name')}}
                    <span class="sm:ml-auto mt-1 pl-1 text-xs text-red-600">*</span>
                  </label>
                  <input
                    id="form-last_name"
                    type="text"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Last Name"
                    v-model="form.last_name"
                  />
                </div>
                <template v-if="v$.form.last_name.$errors">
                    <div
                      v-for="(error, index) in v$.form.last_name.$errors"
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
                  >{{$t('signup.mobile_no')}}
                  </label>
                  <input
                    id="form-mobile_no"
                    type="text"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Mobile Number"
                    v-model="form.mobile_no"
                  />
                </div>

                <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.location')}}
                  </label>
                  <input
                    id="form-location"
                    type="text"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Location"
                    v-model="form.location"
                  />
                </div>

                <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.shipowner_amt')}}
                  </label>
                  <input
                    id="form-shipowner_amt"
                    type="number"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Total Ship Owner"
                    v-model="form.shipowner_amt"
                  />
                </div>

                <div class="form-inline mt-2">
                  <label
                    for="horizontal-form-1"
                    class="form-label sm:w-30"
                  >{{$t('signup.shipusekkfnet_amt')}}
                  </label>
                  <input
                    id="form-shipusekkfnet_amt"
                    type="number"
                    class="form-control intro-x  py-2 px-3 border-gray-300 block mt-4"
                    placeholder="Total Ship use KKF Nets"
                    v-model="form.shipusekkfnet_amt"
                  />
                </div>

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
                    v-model="form.confirmpass"
                  />

                </div>
                <template v-if="v$.form.confirmpass.$errors">
                    <div
                      v-for="(error, index) in v$.form.confirmpass.$errors"
                      :key="index"
                      class="text-theme-24 mt-1 pl-2"
                    >
                     <small>{{ error.$message }}</small>
                    </div>
                  </template>

              </form>
            </div>
            <div class="intro-x flex items-center text-gray-700 dark:text-gray-600 mt-3 text-xs sm:text-sm">
              <input
                id="agree_me"
                type="checkbox"
                class="form-check-input border mr-2"
                v-model="form.agree"
                ref="agree_me"
              />
              <label
                class="cursor-pointer select-none"
                for="agree_me"
              >{{$t('signup.agree')}}</label>
              <a
                class="text-theme-17 dark:text-gray-300 ml-1"
                href=""
              >{{$t('signup.policy')}}</a>.
            </div>
            <div class="intro-x mt-3 xl:mt-3 text-center xl:text-left">
              <button
                class="btn btn-primary py-2 px-3 w-full xl:w-32 xl:mr-3 align-top"
                type="submit"
                @click="onSubmit"
              >
                {{$t('button.register')}}
              </button>
              <button
                class="btn btn-outline-secondary py-2 px-3 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="signin"
              >
                {{$t('button.signin')}}
              </button>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
        <!-- BEGIN: Success Notification Content -->
              <div
                id="success-notification-content"
                class="toastify-content hidden flex"
              >
                <CheckCircleIcon class="text-theme-10" />
                <div class="ml-4 mr-4">
                  <div class="font-medium">{{$t('signup.success_title')}}</div>
                  <div class="text-gray-600 mt-1">
                    {{$t('signup.success_info')}}
                  </div>
                </div>
              </div>
              <!-- END: Success Notification Content -->
              <!-- BEGIN: Failed Notification Content -->
              <div
                id="failed-notification-content"
                class="toastify-content hidden flex"
              >
                <XCircleIcon class="text-theme-24" />
                <div class="ml-4 mr-4">
                  <div class="font-medium">{{$t('signup.failed_title')}}</div>
                  <div class="text-gray-600 mt-1">
                    {{$t('signup.failed_info')}}
                  </div>
                </div>
              </div>
              <!-- END: Failed Notification Content -->

              <!-- BEGIN: Verify Content -->
              <div v-show="verify && !verifySuccess" class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
               <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
          <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              {{$t('signup.msg1', [$route.query.email])}}
            </h2>
            <div
              class="intro-x mt-2 text-gray-500 dark:text-gray-500 text-center"
            >
              {{$t('signup.msg2')}}
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                @click="resend()"
              >
                {{$t('signup.resendemail')}}
              </button>
            </div>
            <div class="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-5">
                <div class="col-span-3 h-full rounded bg-theme-10"></div>
                <div class="col-span-3 h-full rounded bg-theme-10"></div>
                <div class="col-span-3 h-full rounded bg-theme-10"></div>
                <div
                  class="col-span-3 h-full rounded bg-gray-200 dark:bg-dark-2"
                ></div>
              </div>

              <div class="intro-x mt-8">
              <h6>{{$t('signup.msg3')}}:</h6>
              <ul class="side-menu__sub-icon">
                <li class="pl-5">{{$t('signup.check1')}}</li>
        <li class="pl-5">{{$t('signup.check2')}}</li>
        <li class="pl-5">{{$t('signup.check3')}}</li>
        <li class="pl-5">{{$t('signup.check4')}}</li>
              </ul>

               </div>
          </div>

    </div>

    <div v-show="verifySuccess" class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
    <div class="my-auto mx-auto xl:ml-20 bg-white dark:bg-dark-1 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
<div v-show="vsuccess">
      <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left text-success"
            >
              {{$t('signup.conftext')}}
            </h2>
            <div
              class="intro-x mt-2 text-gray-500 dark:text-gray-500 text-center"
            >
              {{$t('signup.welcome')}}
            </div>
            <div class="intro-x mt-3 xl:mt-3 text-center xl:text-left">
              <button
                class="btn btn-primary py-2 px-3 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="signin"
              >
                {{$t('button.signin')}}
              </button>
            </div>
        </div>

<div v-show="!vsuccess">
       <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left text-danger"
            >
              {{$t('signup.failtext')}}
            </h2>
            <div
              class="intro-x mt-2 text-gray-500 dark:text-gray-500 text-center"
            >
              {{$t('signup.contacttext')}}
            </div>
            <div class="intro-x mt-3 xl:mt-3 text-center xl:text-left">
              <button
                class="btn btn-primary py-2 px-3 w-full xl:w-32 xl:mr-3 align-top"
                type="submit"
                @click="register"
              >
                {{$t('button.register')}}
              </button>
              <button
                class="btn btn-outline-secondary py-2 px-3 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="signin"
              >
                {{$t('button.signin')}}
              </button>
            </div>
            </div>
</div>
    </div>

              <!-- END: Verify Content -->
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

import Toastify from 'toastify-js'

export default defineComponent({
  name: 'signup',
  components: {
    DarkModeSwitcher,
    SwitchLanguage
  },
  setup () {
    onMounted(() => {
      cash('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login')
    })

    return { v$: useVuelidate() }
  },

  computed: {
    verify() {
      return this.$route.query.email != undefined
    },
    verifySuccess() {
      return (
        this.$route.query.email != undefined &&
        this.$route.query.emailconfirm != undefined
      )
    }
  },
  mounted () {
    if (this.verifySuccess) {
      this.$root.api.MemberVerify({
        data: {
          email: this.$route.query.email,
          code: this.$route.query.code,
          emailconfirm_flag: this.$route.query.emailconfirm
        },
        callback: res => {
          this.vsuccess = true
        }
      })
    }
  },
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        mobile_no: '',
        location: '',
        shipowner_amt: null,
        shipusekkfnet_amt: null,
        picture_path: null,
        email: '',
        password: '',
        confirmpass: '',
        agree: false
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
        email: {
          required,
          email
        },
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
          sameAs: sameAs(this.form.password)
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
    onSubmit () {
      this.v$.$touch()
      if (this.v$.$error) return false
      if (!this.form.agree) {
        this.$refs.agree_me.focus()
        Toastify({
          node: cash('#failed-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else {
        this.onSave()
      }
    },
    async onSave() {
      var res = await this.signup()
      if (res != null) {
        this.$router.push('/signup?email=' + res.email)
        Toastify({
          text: 'Registration success!',
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
    signup() {
      return new Promise((resolve, reject) => {
        this.$root.api.MemberRegister({
          data: this.form,
          callback: res => {
            resolve(res)
          }
        })
      })
    },
    resend () {
      this.$root.api.MemberResendEmail({
        data: { email: this.$route.query.email },
        callback: res => {
          this.$root.AlertMessage('success')
        }
      })
    },
    signin () {
      this.$router.push('/SignIn')
    },
    register() {
      this.$router.push('/SignUp')
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

  }

})
</script>
