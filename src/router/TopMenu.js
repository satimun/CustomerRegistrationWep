import DashboardStaff from '../views/dashboard/staff.vue'
import DashboardUser from '../views/dashboard/user.vue'
import ProductReportStaff from '../views/report/staff.vue'
import ProductReportUser from '../views/report/user.vue'

const profile = () => import('@/views/member/profile')
const changepassword = () => import('@/views/member/changepassword')
const registerproduct = () => import('@/views/product/register')

const TopMenuRoutes = [
  {
    path: 'profile',
    name: 'top-menu-profile-overview',
    component: profile,
    meta: {
      label: 'Profile'
    }
  },
  {
    path: 'changepassword',
    name: 'top-menu-profile-changepassword',
    component: changepassword,
    meta: {
      label: 'Change Password'
    }
  },
  {
    path: '/registerqrcode',
    name: 'top-menu-product-register',
    component: registerproduct,
    meta: {
      label: 'Register KKF Product'
    },
    props: true
  },
  {
    path: '/',
    name: 'top-menu-dashboard',
    component: (JSON.parse(localStorage.getItem('app_UType')) == 'S') ? DashboardStaff : DashboardUser,
    meta: {
      label: 'My KKF'
    }
  },
  {
    path: 'reportproduct',
    name: 'top-menu-report',
    component: (JSON.parse(localStorage.getItem('app_UType')) == 'S') ? ProductReportStaff : ProductReportUser,
    meta: {
      label: 'My Products'
    }
  }
]

export default TopMenuRoutes
