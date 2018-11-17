import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import { currency } from './util/currency'
import Vuex from 'vuex'


Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bubbles.svg'
})
Vue.config.productionTip = false
Vue.filter('currency', currency);

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0,
    cartList: [],
    addressList: []
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += parseInt(cartCount);
    },
    initCartCount(state, cartCount) {
      state.cartCount = parseInt(cartCount);
    },
    updateCartList(state, cartList) {
      state.cartList = cartList;
    },
    updateAddressList(state, addressList) {
      state.addressList = addressList;
    }
  }
})

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
