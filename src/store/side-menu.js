const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: 'side-menu-dashboard',
        title: 'My KKF'
      },
      'devider',
      {
        icon: 'EditIcon',
        pageName: 'side-menu-product-register',
        title: 'Register KKF Product'
      },
      'devider',
      {
        icon: 'TagIcon',
        pageName: 'side-menu-report',
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
