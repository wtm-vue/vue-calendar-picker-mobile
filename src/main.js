import Vue from "vue"
import App from "./App.vue"
import { CalendarBase, Calendar, CalendarRange, CalendarMonth, CalendarYear } from "../packages/index.js"
Vue.config.productionTip = false
Vue.use(CalendarBase)
Vue.use(Calendar)
Vue.use(CalendarRange)
Vue.use(CalendarMonth)
Vue.use(CalendarYear)
new Vue({
  render: h => h(App)
}).$mount("#app")
