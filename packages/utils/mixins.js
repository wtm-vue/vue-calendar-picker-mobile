/*
 * @Author: tianmei.wu
 * @Date: 2020-02-24 21:26:32
 * @Description:公共mixins
 */
export const EVENT_MIXINS = {
  data() {
    return {
      isMoving: false,
      selectedDates: [],
      firstInfo: null
    }
  },
  computed: {
    contEl() {
      return this.$refs._dc.querySelector(".day-cont")
    },
    isMobile() {
      return window.navigator.userAgent.toLowerCase().indexOf("mobile") > -1
    }
  },
  mounted() {
    this.isMobile &&
      this.$nextTick(function() {
        this.initEvent()
      })
  },
  methods: {
    initEvent() {
      if (this.contEl) {
        this.contEl.addEventListener("touchstart", this.touchStart, false)
        this.contEl.addEventListener("touchend", this.touchEnd, false)
        this.contEl.addEventListener("touchmove", this.moving, false)
      }
    },
    getTarget(evt) {
      let target = evt.target
      if (this.isMobile) {
        let ft = evt.touches[0]
        if (!ft) return null
        let { pageX, pageY } = ft
        target = document.elementFromPoint(pageX, pageY)
      }
      if (!target) return null
      if (target.tagName !== "SPAN") {
        target = target.querySelector("span")
      }
      return target
    },
    touchStart(evt) {
      this.isMoving = true
      this.setVal(this.getDateInfo(evt))
    },
    touchEnd(evt) {
      let dateInfo = this.getDateInfo(evt)
      let sds = this.selectedDates
      if (!dateInfo && sds.length < 2) {
        sds.push(sds[0])
      }

      this.isMoving = false
      this.contEl.removeEventListener("touchstart", this.touchStart, false)
      this.contEl.removeEventListener("touchend", this.touchEnd, false)
      this.contEl.removeEventListener("touchmove", this.moving, false)
      this.successHandler()
    },
    onMove() {
      this.isMoving = true
      this.contEl && this.contEl.addEventListener("mousemove", this.moving, false)
    },
    offMove() {
      this.isMoving = false
      this.contEl.removeEventListener("mousemove", this.moving, false)
      this.firstInfo = null
    },
    moving(evt) {
      let dateInfo = this.getDateInfo(evt)
      if (!dateInfo) return
      let info = this.getMomentDateInfo(dateInfo)
      info && this.setSelectedDates(info)
    },
    setSelectedDates(info) {
      let { mDate } = info
      this.$set(this, "selectedDates", mDate.isBefore(this.firstInfo.datestr) ? [info, this.firstInfo] : [this.firstInfo, info])
    },
    successHandler() {
      this.success && this.success(this.selectedDates)
      this.selectedDates = []
    },
    setVal(dayInfo) {
      let info = this.getMomentDateInfo(dayInfo)
      let sds = this.selectedDates
      if (this.isRange) {
        if (sds.length === 0 || !this.firstInfo) {
          this.selectedDates = [info]
          this.firstInfo = this.selectedDates[0]
        } else {
          if (sds.length === 1) {
            this.setSelectedDates(info)
          }
          this.successHandler()
          this.offMove()
        }
      } else {
        this.selectedDates = [info]
        this.successHandler()
        let dateObj = this.selectedDates.map(item => item.date)
        this.$emit("input", dateObj[0])
      }
      this.curdate = info.date
      this.setMonthInfo()
    }
  }
}
