// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFirestore from 'vue-firestore'
import ElementUI from 'element-ui'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import moment from 'moment'
import reactiveStorage from 'vue-reactive-storage'
import VueCroppie from 'vue-croppie'
import 'croppie/croppie.css'

import AuthService from './services/auth.service'
import ProductService from './services/product.service'

import 'element-ui/lib/theme-chalk/index.css'
require('firebase/firestore')

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Buefy)
Vue.use(VueFirestore)
// Set initial values
Vue.use(reactiveStorage, {
  'name': ''
})
Vue.use(VueCroppie)

Vue.prototype.$authService = new AuthService(router)
Vue.prototype.$productService = new ProductService(router)

Vue.mixin({
  data: () => ({
    notifyPromise: Promise.resolve()
  }),
  filters: {
    calendar (date) {
      return moment(date).calendar()
    },
    trim (text = '', count, dots = true) {
      if (text.length > count) {
        return text.substr(0, count - 1) + (dots ? '...' : '')
      }
      return text
    },
    currency (value, currency = 'XAF') {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat(` ${currency}`)
    }
  },
  methods: {
    notify (msg, title = 'Success', type = 'success', dur = 3000) {
      this.notifyPromise.then(this.$nextTick).then(() => {
        this.$notify({
          title: title,
          message: msg,
          duration: dur,
          type
        })
      })
    },
    shortDate (value) {
      return moment(value).format('MMM Do YY')
    },
    displayMessage (message, cbOK = () => {
    }, type = 'success', title = '') {
      this.$confirm(message, (title || 'Message'), {
        confirmButtonText: 'Close',
        showCancelButton: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        confirmButtonClass: `el-button--${type === 'error' ? 'danger' : 'primary'}`,
        dangerouslyUseHTMLString: true,
        type: type
      }).then(cbOK)
    },
    askQuestion (question, cbOK = () => {
    }, title = 'Question', cbCancel = () => {
    }, type = 'question', config) {
      if (question) {
        this.$confirm(question, title, {
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel',
          closeOnPressEscape: false,
          closeOnClickModal: false,
          iconClass: 'el-icon-question',
          type: type,
          dangerouslyUseHTMLString: true,
          beforeClose: (action, instance, done) => {
            done()
          }
        }).then((res) => {
          cbOK(res)
        }).catch((err) => {
          cbCancel(err)
        })
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
