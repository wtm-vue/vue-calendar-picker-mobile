import Vue from "vue"
import App from "./App.vue"
import { CalendarBase, Calendar, CalendarRange, CalendarMonthBase, CalendarMonth, CalendarYearBase, CalendarYear, CalendarMonthRange, CalendarYearRange } from "../packages/index.js"
Vue.config.productionTip = false
Vue.use(CalendarBase)
Vue.use(Calendar)
Vue.use(CalendarRange)
Vue.use(CalendarMonthBase)
Vue.use(CalendarMonth)
Vue.use(CalendarMonthRange)
Vue.use(CalendarYearBase)
Vue.use(CalendarYear)
Vue.use(CalendarYearRange)
new Vue({
  render: h => h(App)
}).$mount("#app")
