<template>
  <div>
    <div @click.prevent="show">点我{{calShow}}</div>
    <div v-if="calShow">
      <div class="mask" @click="hide" :class="{
        'mask-fade-in':calUp,'mask-fade-out':calDown
      }"></div>
      <BaseCalendar class="cal-cont" :class="{
        'cal-fade-in':calUp,'cal-fade-out':calDown
      }" :success="confirmSel"></BaseCalendar>
    </div>
  </div>
</template>

<script type="text/babel">
import BaseCalendar from "../base-calendar"
export default {
  name: "Calendar",

  props: {},

  data() {
    return {
      calShow: false,
      calUp: false,
      calDown: false
    }
  },

  methods: {
    confirmSel() {},
    show() {
      this.calShow = true
      this.$nextTick(function() {
        this.calUp = true
      })
    },
    hide() {
      this.calDown = true
      setTimeout(() => {
        this.calUp = false
        this.calDown = false
        this.calShow = false
      }, 300)
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../styles/varibles.scss";
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
</style>