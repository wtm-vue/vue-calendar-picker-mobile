<template>
  <div class="base-cal">
    <div class="vdm-flex cal-header">
      <div><i class="iconfont icon-double-arrow-left- mr" @click="switchCal('year',-1)"></i> <i
          class="iconfont icon-arrow-left-" @click="switchCal('month',-1)"></i></div>
      <div>{{curStr}}</div>
      <div>
        <i class="iconfont icon-arrow-right- mr" @click="switchCal('month',1)"></i><i
          class="iconfont icon-double-arrow-right-" @click="switchCal('year',1)"></i> </div>
    </div>
    <div class="cal-cont-cont">
      <div class="vdm-flex week-cont">
        <div v-for="(w,key) in WEEKS" :key="key">{{w}}</div>
      </div>
      <div class="day-cont">
        <div v-for="(row,key) in monthInfo" :key="key" class="vdm-flex">
          <div v-for="(rd,key) in row" :key="key" class="day"
            :class="{gray:rd.type,cur:isToday(rd),selected:isSelected(rd)}">
            <div
              :class="{'vdm-in-range':isInRange(rd),'vdm-range-start':isRangeStartEnd(rd,0),'vdm-range-end':isRangeStartEnd(rd,1)}">
              <span @click="selDate(rd)">{{rd.day}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { WEEKS } from "../utils/const"
import { getFullMonthInfo, formatDate2Str } from "../utils/date"

import { DATE_FORMAT, PICKER_TYPE } from "../utils/const"
import moment from "moment"
export default {
  name: "CalendarYear",

  props: {
    type: {
      type: String,
      default: PICKER_TYPE.DATE
    },
    userInput: Array,
    success: Function
  },

  data() {
    return {
      WEEKS,
      monthInfo: [],
      curdate: new Date(),
      selectedDates: []
    }
  },
  watch: {
    userInput: {
      handler: function(val) {
        let arr = []
        if (!Array.isArray(val)) {
          val = [val]
        }
        val.map(item => {
          arr.push({
            datestr: formatDate2Str(item, DATE_FORMAT.YYYY_MM_DD),
            date: item,
            mDate: moment(item)
          })
        })
        this.selectedDates = arr
      },
      immediate: true
    }
  },
  mounted() {
    this.setMonthInfo()
  },
  methods: {
    buildCurYMD(dayInfo) {
      let { day, type } = dayInfo
      String(day).length === 1 && (day = "0" + day)
      let selDate = moment(this.curdate).add(type, "month")
      let cstr = selDate.format([DATE_FORMAT.YYYY, DATE_FORMAT.MM].join("-"))
      let datestr = [cstr, day].join("-")
      let mDate = moment(datestr)
      return { datestr, date: mDate._d, mDate }
    },
    isToday(dayInfo) {
      let tstr = moment().format(DATE_FORMAT.YYYY_MM_DD)
      return tstr === this.buildCurYMD(dayInfo).datestr
    },
    isSelected(dayInfo) {
      return this.selectedDates.some(item => item.datestr === this.buildCurYMD(dayInfo).datestr)
    },

    isInRange(dayInfo) {
      if (this.rangeSelectedAll) {
        let { mDate, datestr } = this.buildCurYMD(dayInfo)
        return (
          this.selectedDateStr.indexOf(datestr) > -1 ||
          mDate.isBetween.apply(mDate, this.selectedDateStr)
        )
      }
      return false
    },
    isRangeStartEnd(dayInfo, index) {
      if (this.rangeSelectedAll) {
        let sd = this.selectedDateStr
        if (moment(sd[0]).isSame(sd[1])) return false
        let { mDate } = this.buildCurYMD(dayInfo)
        return mDate.isSame(sd[index])
      }
      return false
    },

    setMonthInfo() {
      this.monthInfo = getFullMonthInfo(this.curdate)
    },
    switchCal(type, num) {
      this.curdate = moment(this.curdate).add(num, type)
      this.setMonthInfo()
    },
    selDate(dayInfo) {
      let info = this.buildCurYMD(dayInfo)
      let sds = this.selectedDates
      if (this.type === PICKER_TYPE.DATE_RANGE) {
        if (sds.length >= 2) {
          this.selectedDates = [info]
        } else {
          let { mDate } = info
          if (sds.length === 1 && mDate.isBefore(sds[0].datestr)) {
            this.selectedDates.unshift(info)
          } else {
            this.selectedDates.push(info)
          }
          this.success && this.selectedDates.length > 1 && this.success(this.selectedDates)
        }
      } else {
        this.selectedDates = [info]
        this.success && this.success(this.selectedDates)
      }
      this.curdate = info.date
      this.setMonthInfo()
    }
  },

  computed: {
    curStr() {
      return moment(this.curdate).format(`${DATE_FORMAT.YYYY}年${DATE_FORMAT.MM}月`)
    },
    rangeSelectedAll() {
      return this.type === PICKER_TYPE.DATE_RANGE && this.selectedDates.length === 2
    },
    selectedDateStr() {
      return this.selectedDates.map(item => item.datestr)
    },
    dateRange() {
      return [PICKER_TYPE.DATE, PICKER_TYPE.DATE_RANGE].indexOf(this.type) > -1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/varibles.scss";
@import "../styles/iconfont/iconfont.css";
.base-cal {
  color: #606266;
  font-size: 17px;
  padding: 5px 10px;
  background-color: #fff;
  .mr {
    margin-right: 20px;
  }
  .iconfont {
    &:hover {
      color: $primary-color;
      cursor: pointer;
    }
  }
  .cal-header {
    height: 40px;
    line-height: 40px;
    div {
      font-weight: 500;
      &:first-child,
      &:last-child {
        flex: 0 0 100px;
      }
      &:nth-child(2) {
        text-align: center;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
  .week-cont,
  .day-cont {
    text-align: center;
  }
  .week-cont {
    border-bottom: 1px solid $border-color;
    padding: 5px 0;
  }
  .day {
    font-size: 15px;
    user-select: none;
    padding: 5px 0;
    outline: none;
    span {
      cursor: pointer;
      display: inline-block;
      width: $day-height;
      height: $day-height;
      line-height: $day-height;
    }
    &:active {
      color: $primary-color;
    }
    &.cur {
      color: $primary-color;
      font-weight: 700;
    }
    &.gray {
      color: #c0c4cc;
    }
    &.selected {
      color: #fff;
      span {
        border-radius: 50%;
        background-color: $primary-color;
      }
    }
  }
}
</style>