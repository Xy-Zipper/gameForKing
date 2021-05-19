import Vue from 'vue'
import App from './App'
import {mainApp} from "./pages/common/util.js"

Vue.prototype.$app = mainApp
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
