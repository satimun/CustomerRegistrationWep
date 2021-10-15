<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed border-b border-theme-2 -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="/" class="-intro-x hidden md:flex align-center">
        <img
          alt="KKF Product Registration"
          class="h-10 image-fit zoom-in scale-110"
          src="@/assets/images/logokkf.png"
        />
        <span class="text-white text-lg ml-5 mt-1">
          {{$t('config.title1')}} <span class="font-medium">{{$t('config.title2')}}</span>
        </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <Breadcrumb  :list="list" />
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->

      <!-- END: Search -->
      <!-- BEGIN: Notifications -->

      <!-- END: Notifications -->

      <!-- BEGIN: SwitchLanguage -->
      <SwitchLanguageBar />
      <!-- END: SwitchLanguage -->

      <!-- BEGIN: Account Menu -->
      <div class="intro-x dropdown w-8 h-8">
        <div
          class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
          role="button"
          aria-expanded="false"
        >
          <img
            alt="Profile picture"
            :src="`${userAvatar ? userAvatar : this.imgPath}`"
            @error="imageUrlAlt"
          />
        </div>
        <div class="dropdown-menu w-56">
          <div
            class="dropdown-menu__content box bg-theme-11 dark:bg-dark-6 text-white"
          >
            <div class="p-4 border-b border-theme-12 dark:border-dark-3">
              <div class="font-medium"><span v-if="userCode">{{ userCode }} </span>{{ userName  }}</div>
              <div class="text-xs text-theme-13 mt-0.5 dark:text-gray-600">
                {{ userEmail }}
              </div>
            </div>
            <div class="p-2">
              <a
                href="javascript:;"
                class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                @click="onProfile"
              >
                <UserIcon class="w-4 h-4 mr-2" /> Profile
              </a>
              <a
                href="/registerqrcode"
                class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md hidden"
                v-show="!this.isStaff()"
              >
                <EditIcon class="w-4 h-4 mr-2" /> Register KKF Product
              </a>
              <a
                href="/changepassword"
                class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
              >
                <LockIcon class="w-4 h-4 mr-2" /> Change Password
              </a>
              <a
                href=""
                class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md hidden"
              >
                <HelpCircleIcon class="w-4 h-4 mr-2" /> Help
              </a>
            </div>
            <div class="p-2 border-t border-theme-12 dark:border-dark-3">
              <a
                href="javascript:;"
                class="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                @click="onSignOut()"
              >
                <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import SwitchLanguageBar from '@/components/SwitchLanguageBar.vue'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    SwitchLanguageBar
  },
  setup() {
    const searchDropdown = ref(false)

    const showSearchDropdown = () => {
      searchDropdown.value = true
    }

    const hideSearchDropdown = () => {
      searchDropdown.value = false
    }

    const store = useStore()
    const userAvatar = computed(() => store.state.user.userPicture)
    const userCode = computed(() => store.state.user.userCode)
    const userName = computed(() => store.state.user.userName)
    const userEmail = computed(() => store.state.user.userEmail)
    const userType = computed(() => store.state.user.userType)

    const switchAvatar = (picture) => {
      store.dispatch('user/setPicture', picture)
    }

    const switchProfile = (user) => {
      // console.log(user)
      if (user) {
        store.dispatch('user/setCode', user.code)
        store.dispatch('user/setName', user.fullname)
        store.dispatch('user/setEmail', user.email)
        store.dispatch('user/setType', user.type)
      }
    }

    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      switchAvatar,
      userAvatar,
      userCode,
      userName,
      userEmail,
      userType,
      switchProfile
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    },
    username() {
      return this.$localStorage.get('User')
    }

  },

  mounted () {
    // console.log(this.username)
    if (this.username) {
      this.getUser()
    } else {
      this.onSignOut()
    }
  },
  data() {
    return {
      member: {
        name: '',
        email: '',
        picture: '',
        id: ''
      },
      imgPath: require('@/assets/images/profile.png'),
      avatar: this.imgPath
    }
  },
  methods: {
    onSignOut() {
      this.$root.api.OauthLogout({
        callback: res => {
          this.$localStorage.remove('Token')
          this.$localStorage.remove('User')
          this.$localStorage.remove('UMail')
          this.$localStorage.remove('UCode')
          this.$localStorage.remove('UType')
		  this.$localStorage.remove('AccessToken')
          this.$router.push('/signin')
        }
      })
    },
    getUser() {
      this.$root.api.MemberGet({
        callback: res => {
          this.member = res
          this.switchProfile(res)
          if (res != null) {
            this.avatar_path = res.picture
            this.switchAvatar(res.picture)
          }
        }
      })
    },
    onProfile() {
      if (this.member) {
        if (this.member.type == 'S') {
          this.$router.push('/Staff/Profile')
        } else {
          this.$router.push('/Profile')
        }
      }
    }
  },
  watch: {
    username(newVal, oldVal) {
      if (newVal) {
        this.getUser()
      }
    },
    avatar_path(newVal, oldVal) {
      if (newVal) {
        this.getUser()
      }
    }
  }
})
</script>
