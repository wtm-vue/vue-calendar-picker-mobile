<template>
  <div class="base-cal ymr-cont">
    <div class="vdm-flex cal-header">
      <div><i class="iconfont icon-double-arrow-left- mr" @click="switchCal(-1)"></i></div>
      <div>{{curYearRangeStr}}</div>
      <div>
        <i class="iconfont icon-double-arrow-right-" @click="switchCal(1)"></i> </div>
    </div>
    <div class="cal-cont-cont">
      <div class="day-cont">
        <div class="vdm-flex">
          <div v-for="year in years" :key="year" class="ym" :class="{cur:isCurYear(year),selected:isSelected(year)}">
            <div
              :class="{'vdm-in-range':isInRange(year),'vdm-range-start':isRangeStartEnd(year,0),'vdm-range-end':isRangeStartEnd(year,1)}">
              <span @click="setYear(year)">{{year}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { formatDate2Str } from "../utils/date"
import { DATE_FORMAT, PICKER_TYPE } from "../utils/const"
import moment from "moment"

export default {
  name: "CalendarYear",
  props: {
    userInput: Array,
    success: Function,
    type: {
      type: String,
      default: PICKER_TYPE.YEAR
    }
  },

  data() {
    return {
      years: [],
      yearRange: [],
      selectedDates: []
    }
  },
  watch: {
    userInput: {
      handler: function(val) {
        if (!val) return
        let arr = []
        if (!Array.isArray(val)) {
          val = [val]
        }
        let range = arr.map(item => formatDate2Str(item, DATE_FORMAT.YYYY) - 0)
        this.selectedDates = range
        this.init(range[0])
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(date = new Date()) {
      let cy = moment(date).format(DATE_FORMAT.YYYY)
      let temp = cy.slice(0, 3)
      let sy = temp + 0 - 0
      let ey = temp + 9 - 0
      this.yearRange = [sy, ey]
      this.years = Array.from(new Array(ey + 1).keys()).slice(sy)
    },
    str2Date(str) {
      if (!Array.isArray(str)) {
        str = [str]
      }
      return str.map(item => {
        return new Date(item)
      })
    },
    isCurYear(year) {
      let tstr = moment().format(DATE_FORMAT.YYYY)
      return !(tstr - year)
    },
    isSelected(year) {
      return this.selectedDates.some(item => item - year === 0)
    },

    isInRange(year) {
      if (this.rangeSelectedAll) {
        let sd = this.selectedDates
        return year >= sd[0] && year <= sd[1]
      }
      return false
    },
    isRangeStartEnd(year, index) {
      if (this.rangeSelectedAll) {
        let sd = this.selectedDates
        if (sd[0] - sd[1] === 0) return false

        return !(year - sd[index])
      }
      return false
    },
    switchCal(num) {
      this.yearRange = this.yearRange.map(item => item + num * 10)
    },
    setYear(year) {
      let sds = this.selectedDates
      let sDate = this.str2Date(this.selectedDates)
      if (this.type === PICKER_TYPE.YEAR_RANGE) {
        if (sds.length >= 2) {
          this.selectedDates = [year]
        } else {
          if (sds.length === 1 && year < sds[0]) {
            this.selectedDates.unshift(year)
          } else {
            this.selectedDates.push(year)
          }
          this.success && this.selectedDates.length > 1 && this.success(sDate)
        }
      } else {
        this.selectedDates = [year]
        this.success && this.success(sDate)
      }
    }
  },

  computed: {
    curYearRangeStr() {
      return this.yearRange.map(item => `${item}年`).join("-")
    },
    rangeSelectedAll() {
      return this.type === PICKER_TYPE.YEAR_RANGE && this.selectedDates.length === 2
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/varibles.scss";
</style>