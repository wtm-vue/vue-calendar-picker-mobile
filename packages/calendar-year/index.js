import "../styles/index.scss"
import CalendarYear from "./main.vue"
CalendarYear.install = function(Vue) {
  Vue.component(CalendarYear.name, CalendarYear)
}
export default CalendarYear
