// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import httpPlugin from '@/assets/js/http'
import VueQuillEritor from 'vue-quill-editor'
import ElTreeGrid from 'element-tree-grid'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import echarts from 'echarts'

Vue.component(ElTreeGrid.name, ElTreeGrid)
Vue.use(VueQuillEritor)
Vue.use(ElementUi)
Vue.use(httpPlugin)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
