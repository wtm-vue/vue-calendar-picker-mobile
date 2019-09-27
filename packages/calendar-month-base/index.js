import "../styles/index.scss"
import CalendarMonthBase from "./main.vue"
CalendarMonthBase.install = function(Vue) {
  Vue.component(CalendarMonthBase.name, CalendarMonthBase)
}
export default CalendarMonthBase
