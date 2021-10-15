import * as types from './mutation-types'

const state = () => {
  return {
    userPicture: 'url()',
    imgPath: require('@/assets/images/profile.png'),
    userCode: '',
    userName: '',
    userEmail: '',
    userType: ''
  }
}

// getters
const getters = {
  userPicture: state => state.userPicture,
  userCode: state => state.userCode,
  userName: state => state.userName,
  userEmail: state => state.userEmail,
  userType: state => state.userType
}

// actions
const actions = {
  setPicture({ commit }, userPicture) {
    commit(types.SET_USER_PICTURE, { userPicture })
  },
  setCode({ commit }, userCode) {
    commit(types.SET_USER_CODE, { userCode })
  },
  setName({ commit }, userName) {
    commit(types.SET_USER_NAME, { userName })
  },
  setEmail({ commit }, userEmail) {
    commit(types.SET_USER_EMAIL, { userEmail })
  },
  setType({ commit }, userType) {
    commit(types.SET_USER_TYPE, { userType })
  }
}

// mutations
const mutations = {
  [types.SET_USER_PICTURE](state, { userPicture }) {
    var avatar = userPicture
      ? process.env.VUE_APP_API + userPicture
      : this.imgPath
    state.userPicture = avatar
  },
  [types.SET_USER_CODE](state, { userCode }) {
    state.userCode = userCode
  },
  [types.SET_USER_NAME](state, { userName }) {
    state.userName = userName
  },
  [types.SET_USER_EMAIL](state, { userEmail }) {
    state.userEmail = userEmail
  },
  [types.SET_USER_TYPE](state, { userType }) {
    state.userType = userType
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
