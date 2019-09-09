import Vue from "vue"
import App from "./App.vue"
import { BaseCalendar, Calendar, CalendarRange } from "../lib/index.js"
Vue.config.productionTip = false
Vue.use(BaseCalendar)
Vue.use(Calendar)
Vue.use(CalendarRange)
new Vue({
  render: h => h(App)
}).$mount("#app")
