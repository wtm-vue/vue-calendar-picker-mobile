<template>
  <div class="base-cal">
    <div class="vdm-flex cal-header">
      <div><i class="iconfont icon-double-arrow-left- mr" @click="switchCal('year', -1)"></i> <i class="iconfont icon-arrow-left-" @click="switchCal('month', -1)"></i></div>
      <div>{{ curStr }}</div>
      <div><i class="iconfont icon-arrow-right- mr" @click="switchCal('month', 1)"></i><i class="iconfont icon-double-arrow-right-" @click="switchCal('year', 1)"></i></div>
    </div>
    <div class="cal-cont-cont" ref="_dc">
      <div class="vdm-flex week-cont">
        <div v-for="(w, key) in WEEKS" :key="key">{{ w }}</div>
      </div>
      <div class="cont day-cont">
        <div v-for="(row, key) in monthInfo" :key="key" class="vdm-flex">
          <div v-for="(rd, rkey) in row" :key="rkey" class="day" :class="{ gray: rd.type, cur: isToday(rd), selected: isSelected(rd) }">
            <div :class="{ 'vdm-in-range': isInRange(rd), 'vdm-range-start': isRangeStartEnd(rd, 0), 'vdm-range-end': isRangeStartEnd(rd, 1), 'vdm-range-temp': isTempStatus(rd) }">
              <span @click="selDate(rd)" :data-cindex="rkey" :data-rindex="key">{{ rd.day }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import { getFullMonthInfo, formatDate2Str } from '../utils/date';
import { WEEKS, DATE_FORMAT, PICKER_TYPE } from '../utils/const';
import moment from 'moment';
import { EVENT_MIXINS } from '../utils/mixins';
export default {
  mixins: [EVENT_MIXINS],
  name: 'CalendarBase',
  props: {
    value: [Object, Date],
    userInput: Array,
    success: Function,
    type: {
      type: String,
      default: PICKER_TYPE.DATE
    },
    format: {
      type: String,
      default: DATE_FORMAT.YYYY_MM_DD
    }
  },
  data() {
    return {
      WEEKS,
      monthInfo: [],
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
  mounted() {
    this.setMonthInfo();
  },
  methods: {
    buildCurYMD(dayInfo) {
      let { day, type } = dayInfo;
      String(day).length === 1 && (day = '0' + day);
      let selDate = moment(this.curdate).add(type, 'month');
      let cstr = selDate.format([DATE_FORMAT.YYYY, DATE_FORMAT.MM].join('-'));
      let datestr = [cstr, day].join('-');
      let mDate = moment(datestr);
      return { datestr, date: mDate._d, mDate };
    },
    isToday(dayInfo) {
      let tstr = moment().format(this.format);
      return tstr === this.buildCurYMD(dayInfo).datestr;
    },

    isRangeStartEnd(dayInfo, index) {
      if (this.rangeSelectedAll) {
        let sd = this.selectedDateStr;
        if (moment(sd[0]).isSame(sd[1])) return false;
        let { mDate } = this.buildCurYMD(dayInfo);
        return mDate.isSame(sd[index]);
      }
      return false;
    },
    isTempStatus(dayInfo) {
      if (!this.firstInfo) return;
      let { mDate } = this.buildCurYMD(dayInfo);
      let last = this.selectedDates.find(item => !item.mDate.isSame(this.firstInfo.datestr));
      return last && this.isMoving && mDate.isSame(last.datestr);
    },
    setMonthInfo() {
      this.monthInfo = getFullMonthInfo(this.curdate);
    },
    switchCal(type, num) {
      this.curdate = moment(this.curdate).add(num, type);
      this.setMonthInfo();
    },
    selDate(dayInfo) {
      if (!this.isMobile && this.isRange && !this.firstInfo) {
        this.onMove();
      }
      this.setVal(dayInfo);
      this.setMonthInfo();
    },

    getDateInfo(evt) {
      let target = this.getTarget(evt);
      if (!target) return;
      let { cindex, rindex } = this.getTarget(evt).dataset;
      return this.monthInfo[rindex][cindex];
    },
    getMomentDateInfo(info) {
      return this.buildCurYMD(info);
    }
  },

  computed: {
    curStr() {
      return moment(this.curdate).format(`${DATE_FORMAT.YYYY}年${DATE_FORMAT.MM}月`);
    },
    rangeSelectedAll() {
      return this.isRange && this.selectedDates.length === 2;
    },
    dateRange() {
      return [PICKER_TYPE.DATE, PICKER_TYPE.DATE_RANGE].indexOf(this.type) > -1;
    },
    selectedDateStr() {
      return this.selectedDates.map(item => item.datestr);
    },
    isRange() {
      return this.type === PICKER_TYPE.DATE_RANGE;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../styles/varibles.scss';
.base-cal {
  .week-cont,
  .day-cont {
    text-align: center;
  }
  .week-cont {
    border-bottom: 1px solid $border-color;
    padding: 3px 0;
  }
  .day {
    span {
      cursor: pointer;
      display: inline-block;
      width: $day-height;
      height: $day-height;
      line-height: $day-height;
    }
  }
}
</style>
