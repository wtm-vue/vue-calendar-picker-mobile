<template>
  <div class="base-cal ymr-cont">
    <div class="vdm-flex cal-header">
      <div><i class="iconfont icon-double-arrow-left- mr" @click="switchCal('year', -1)"></i></div>
      <div>{{ curStr }}</div>
      <div>
        <i class="iconfont icon-double-arrow-right-" @click="switchCal('year', 1)"></i>
      </div>
    </div>
    <div class="cal-cont-cont" ref="_dc">
      <div class="day-cont">
        <div class="vdm-flex">
          <div v-for="(m, index) in MONTHS" :key="index" class="ym" :class="{ cur: isThisMonth(index), selected: isSelected(index) }">
            <div :class="{ 'vdm-in-range': isInRange(index), 'vdm-range-start': isRangeStartEnd(index, 0), 'vdm-range-end': isRangeStartEnd(index, 1), 'vdm-range-temp': isTempStatus(index) }">
              <span @click="setMonth(index)" :data-cindex="index">{{ m }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import { formatDate2Str } from '../utils/date';
import { DATE_FORMAT, PICKER_TYPE, MONTHS } from '../utils/const';
import moment from 'moment';
import { EVENT_MIXINS } from '../utils/mixins';
export default {
  mixins: [EVENT_MIXINS],
  name: 'CalendarMonthBase',
  props: {
    value: [Object, Date],
    format: {
      type: String,
      default: DATE_FORMAT.YYYY_MM
    },
    userInput: Array,
    success: Function,
    type: {
      type: String,
      default: PICKER_TYPE.MONTH
    }
  },

  data() {
    return {
      MONTHS,
      curdate: new Date()
    };
  },
  watch: {
    userInput: {
      handler: function(val) {
        if (!val || !val.length) return;
        let arr = [];
        if (!Array.isArray(val)) {
          val = [val];
        }
        val.map(item => {
          arr.push({
            datestr: formatDate2Str(item, this.format),
            date: item,
            mDate: moment(item)
          });
        });
        this.selectedDates = arr;
        this.curdate = arr[0].date;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    buildCurYM(month) {
      let cm = moment(this.curdate, this.format);
      cm.month(month);
      let datestr = cm.format(this.format);
      return { datestr, date: cm._d, mDate: cm };
    },
    isThisMonth(month) {
      let tstr = moment().format(this.format);
      return tstr === this.buildCurYM(month).datestr;
    },
    isTempStatus(dayInfo) {
      if (!this.firstInfo) return;
      let { datestr } = this.buildCurYM(dayInfo);
      let last = this.selectedDates.find(item => item.datestr !== this.firstInfo.datestr);
      return last && this.isMoving && datestr === last.datestr;
    },
    isRangeStartEnd(month, index) {
      if (this.rangeSelectedAll) {
        let sd = this.selectedDateStr;
        if (moment(sd[0]).isSame(sd[1])) return false;
        let { datestr } = this.buildCurYM(month);
        return datestr === sd[index];
      }
      return false;
    },
    switchCal(type, num) {
      this.curdate = moment(this.curdate).add(num, type);
    },
    setMonth(month) {
      if (!this.isMobile && this.isRange && !this.firstInfo) {
        this.onMove();
      }
      this.setVal(month);
    },
    getMomentDateInfo(info) {
      return this.buildCurYM(info);
    }
  },

  computed: {
    selectedDateStr() {
      return this.selectedDates.map(item => item.datestr);
    },
    curStr() {
      return moment(this.curdate).format(`${DATE_FORMAT.YYYY}年`);
    },
    rangeSelectedAll() {
      return this.type === PICKER_TYPE.MONTH_RANGE && this.selectedDates.length === 2;
    },
    isRange() {
      return this.type === PICKER_TYPE.MONTH_RANGE;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/varibles.scss';
</style>
