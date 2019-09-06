import Calendar from "./main"
Calendar.install = function(Vue) {
  Vue.component(Calendar.name, Calendar)
}
export default Calendar
