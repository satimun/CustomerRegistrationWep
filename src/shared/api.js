export default {
  data() {
    return {
      api: {
        // --------------------Oauth-----------------------//
        OauthAccess: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/Oauth/Access' })
          this.Call(o)
        },
        OauthLogin: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Oauth/Login' })
          this.Call(o)
        },
        OauthLogout: (o) => {
          Object.assign(o, { method: 'delete', path: 'v1/Oauth/Logout' })
          this.Call(o)
        },
        OauthTokenStatus: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/Oauth/TokenStatus' })
          this.Call(o)
        },
        OauthSingleSignOn: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Oauth/SingleSignOn' })
          this.Call(o)
        },

        // --------------------Member-----------------------//
        MemberRegister: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/SignUp' })
          this.Call(o)
        },
        MemberVerify: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/Verify' })
          this.Call(o)
        },
        MemberResendEmail: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/ResendEmail' })
          this.Call(o)
        },
        MemberSearch: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/Search' })
          this.Call(o)
        },
        MemberReqPassword: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/ForgotPassword' })
          this.Call(o)
        },
        MemberResetPassword: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/ResetPassword' })
          this.Call(o)
        },
        MemberGet: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/Member/Get' })
          this.Call(o)
        },
        MemberChangePassword: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/ChangePassword' })
          this.Call(o)
        },
        MemberUpdate: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/Update' })
          this.Call(o)
        },
        MemberUpdateStatus: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/UpdateStatus' })
          this.Call(o)
        },
        MemberChangePicture: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/Member/ChangePicture' })
          this.Call(o)
        },
        // --------------------- User Picture ---------------------//
        MemberPictureGet: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/UserPicture/Get' })
          this.Call(o)
        },
        MemberPictureSave: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/UserPicture/Save' })
          this.Call(o)
        },

        // --------------------- User Config ---------------------//
        UserConfigGet: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/UserConfig/Get' })
          this.Call(o)
        },
        UserConfigSave: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/UserConfig/Save' })
          this.Call(o)
        },
        UserConfigSearch: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/UserConfig/Search' })
          this.Call(o)
        },

        // --------------------- User Notify ---------------------//
        UserNotifyGet: (o) => {
          Object.assign(o, { method: 'get', path: 'v1/User/NotifyGet' })
          this.Call(o)
        },
        UserNotifySave: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/User/NotifySave' })
          this.Call(o)
        },
        UserNotifyDelete: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/User/NotifyDelete' })
          this.Call(o)
        },
        UserNotifyList: (o) => {
          Object.assign(o, { method: 'post', path: 'v1/User/NotifyList' })
          this.Call(o)
        }

      }
    }
  }
}
