import "../styles/index.scss"
import BaseCalendar from "./main"
BaseCalendar.install = function(Vue) {
  Vue.component(BaseCalendar.name, BaseCalendar)
}
export default BaseCalendar
