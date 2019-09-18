<template>
  <div class="cal-warp">
    <slot></slot>
    <div v-if="calShow">
      <div class="mask" @click="hide" :class="{
        'mask-fade-in':calUp,'mask-fade-out':calDown
      }"></div>
      <CalendarBase v-bind="$attrs" class="cal-cont" :class="{
        'cal-fade-in':calUp,'cal-fade-out':calDown
      }" :success="confirmSel" ref="_calBase"></CalendarBase>
    </div>
  </div>
</template>

<script type="text/babel">
import CalendarBase from "./calendar-base/index"
export default {
  name: "CalBase",

  data() {
    return {
      calShow: false,
      calUp: false,
      calDown: false
    }
  },
  mounted() {},
  components: {
    CalendarBase
  },
  methods: {
    confirmSel(vals) {
      this.$emit("confirm", vals.map(item => item.date))
    },
    show() {
      this.calShow = true
      this.$nextTick(function() {
        document.body.style.overflow = "hidden"
        this.$refs._calBase.$el.addEventListener("animationend", this.aend)
        this.calUp = true
      })
    },
    aend() {
      if (this.calDown) {
        this.$refs._calBase.$el.removeEventListener("animationend", this.aend)
        document.body.style.overflow = null
        this.calUp = false
        this.calDown = false
        this.calShow = false
      }
    },
    hide() {
      this.calDown = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/varibles.scss";
.mask {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: $z-index;
}
.mask-fade-in,
.mask-fade-out,
.cal-fade-in,
.cal-fade-out {
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}
.mask-fade-in {
  animation-name: amFadeIn;
  animation-play-state: running;
  opacity: 0;
}
.mask-fade-out {
  animation-name: amFadeOut;
  animation-play-state: running;
}
@keyframes amFadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes amFadeOut {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.cal-cont {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: $z-index;
}
.cal-fade-in {
  animation-play-state: running;
  animation-name: calFadeIn;
  transform: translateY(100%);
}
.cal-fade-out {
  animation-play-state: running;
  animation-name: calFadeOut;
}
@keyframes calFadeIn {
  0% {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes calFadeOut {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
.cal-warp {
  display: inline-flex;
  align-items: center;
  border: 1px solid $border-color;
  justify-content: center;
}
</style>