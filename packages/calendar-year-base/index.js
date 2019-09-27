import "../styles/index.scss"
import CalendarYearBase from "./main.vue"
CalendarYearBase.install = function(Vue) {
  Vue.component(CalendarYearBase.name, CalendarYearBase)
}
export default CalendarYearBase
