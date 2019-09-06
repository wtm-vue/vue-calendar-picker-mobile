import moment from "moment"
import { DATE_FORMAT } from "./const"
export function getDays(max, pos) {
  max -= 0
  var arr = [...Array(max).keys()]
  arr.shift()
  arr.push(max)
  return pos > 0 ? arr.splice(0, pos) : arr.splice(pos)
}
export function getMonthFirstDayInfo(date = new Date()) {
  var fd = moment(date).startOf("month")
  return {
    date: fd,
    day: fd.format(DATE_FORMAT.DD),
    week: fd.day()
  }
}
export function getMonthLastDayInfo(date = new Date()) {
  var ed = moment(date).endOf("month")
  return {
    date: ed,
    day: ed.format(DATE_FORMAT.DD),
    week: ed.day()
  }
}
function buildDayObj(day, type) {
  return {
    day,
    type
  }
}
export function getFullMonthInfo(date = new Date()) {
  var fd = getMonthFirstDayInfo(date)
  var ed = getMonthLastDayInfo(date)
  var dates = []
  if (fd.week) {
    var preMonthEndDay = getMonthLastDayInfo(fd.date.subtract(1, "days"))
    var pds = getDays(preMonthEndDay.day, -fd.week)
    pds.map(item => {
      dates.push(buildDayObj(item, -1))
    })
  }
  var cds = getDays(ed.day)
  cds.map(item => {
    dates.push(buildDayObj(item, 0))
  })
  var ld = 42 - dates.length
  if (ld) {
    var nds = getDays(ld)
    nds.map(item => {
      dates.push(buildDayObj(item, 1))
    })
  }
  var _dates = []
  for (var i = 0; i < 6; ++i) {
    _dates.push(dates.slice(i * 7, (i + 1) * 7))
  }
  return _dates
}
