const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'top-menu-dashboard',
        title: 'My KKF'
      },
      {
        icon: 'EditIcon',
        pageName: 'top-menu-product-register',
        title: 'Register KKF Product'
      },
      {
        icon: 'TagIcon',
        pageName: 'top-menu-report',
        title: 'My Products'
      }
    ]
  }
}

// getters
const getters = {
  menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
