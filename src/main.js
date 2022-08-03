import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'babel-polyfill'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import AvueFormDesign from '@/components/form-design'
import { findComponentsUpward } from '@/components/form-design/mixins/findComponents'

// elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// css
import '@/assets/css/form-design.scss'
import '@/assets/css/icon.css'
import '@/assets/css/font-awesome.css'
import '@/assets/css/font_1254447_zc9iezc230c.css'

Vue.config.productionTip = false
Vue.prototype.$findComponentsUpward = findComponentsUpward

Vue.use(Avue)
Vue.use(ElementUI)
Vue.use(AvueFormDesign)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
