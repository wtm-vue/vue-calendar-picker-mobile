<template>
  <div class="base-cal ymr-cont">
    <div class="vdm-flex cal-header">
      <div><i class="iconfont icon-double-arrow-left- mr" @click="switchCal(-1)"></i></div>
      <div>{{ curYearRangeStr }}</div>
      <div>
        <i class="iconfont icon-double-arrow-right-" @click="switchCal(1)"></i>
      </div>
    </div>
    <div class="cal-cont-cont" ref="_dc">
      <div class="day-cont">
        <div class="vdm-flex">
          <div v-for="year in years" :key="year" class="ym" :class="{ cur: isCurYear(year), selected: isSelected(year) }">
            <div :class="{ 'vdm-in-range': isInRange(year), 'vdm-range-start': isRangeStartEnd(year, 0), 'vdm-range-end': isRangeStartEnd(year, 1), 'vdm-range-temp': isTempStatus(year) }">
              <span @click="setYear(year)" :data-cindex="year">{{ year }}</span>
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
import { EVENT_MIXINS } from "../utils/mixins"
export default {
  mixins: [EVENT_MIXINS],
  name: "CalendarYearBase",
  props: {
    value: [Object, Date],
    userInput: Array,
    success: Function,
    type: {
      type: String,
      default: PICKER_TYPE.YEAR
    },
    format: {
      type: String,
      default: DATE_FORMAT.YYYY
    }
  },

  data() {
    return {
      isYear: true,
      years: [],
      yearRange: [],
      selectedDates: []
    }
  },
  watch: {
    userInput: {
      handler: function(val) {
        if (!val || !val.length) {
          this.init()
          return
        }
        if (!Array.isArray(val)) {
          val = [val]
        }
        let range = val.map(item => formatDate2Str(item, this.format) - 0)
        this.selectedDates = range
        this.init(new Date(range[0] + ""))
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    getYearArray(startYear, endYear) {
      return Array.from(new Array(endYear + 1).keys()).slice(startYear)
    },
    init(date = new Date()) {
      let cy = moment(date).format(this.format)
      let temp = cy.slice(0, 3)
      let sy = temp + 0 - 0
      let ey = temp + 9 - 0
      this.yearRange = [sy, ey]
      this.years = this.getYearArray(sy, ey)
    },
    str2Date(str) {
      if (!Array.isArray(str)) {
        str = [str]
      }
      return str.map(item => {
        return { date: new Date(item + "") }
      })
    },
    isCurYear(year) {
      let tstr = moment().format(this.format)
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
    isTempStatus(year) {
      if (!this.firstInfo) return
      const _this = this
      let last = this.selectedDates.find(item => item - this.firstInfo)
      return last && this.isMoving && !(year - last)
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
      let range = this.yearRange.map(item => item + num * 10)
      this.years = this.getYearArray(range[0], range[1])
      this.yearRange = range
    },
    setYear(year) {
      if (!this.isMobile && this.isRange && !this.firstInfo) {
        this.onMove()
      }
      this.setVal(year)
      // let sds = this.selectedDates
      // if (this.type === PICKER_TYPE.YEAR_RANGE) {
      //   if (sds.length >= 2) {
      //     this.selectedDates = [year]
      //   } else {
      //     if (sds.length === 1 && year < sds[0]) {
      //       this.selectedDates.unshift(year)
      //     } else {
      //       this.selectedDates.push(year)
      //     }
      //     this.success && this.selectedDates.length > 1 && this.success(this.str2Date(this.selectedDates))
      //   }
      // } else {
      //   this.selectedDates = [year]
      //   let dateObj = this.str2Date(this.selectedDates)
      //   this.success && this.success(dateObj)
      //   this.$emit("input", dateObj[0])
      // }
    },

    getMomentDateInfo(year) {
      return year
    }
  },

  computed: {
    curYearRangeStr() {
      return this.yearRange.map(item => `${item}年`).join("-")
    },
    rangeSelectedAll() {
      return this.type === PICKER_TYPE.YEAR_RANGE && this.selectedDates.length === 2
    },
    isRange() {
      return this.type === PICKER_TYPE.YEAR_RANGE
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/varibles.scss";
</style>
