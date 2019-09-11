import "../styles/index.scss"
import CalendarBase from "./main"
CalendarBase.install = function(Vue) {
  Vue.component(CalendarBase.name, CalendarBase)
}
export default CalendarBase
