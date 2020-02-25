<template>
  <div class="cal-warp">
    <slot></slot>
    <ToggleCalendar ref="_toggleCalendar" v-bind="$attrs" v-on="$listeners"> </ToggleCalendar>
  </div>
</template>

<script type="text/babel">
import ToggleCalendar from "./ToggleCalendar"
export default {
  name: "CalBase",

  data() {
    return {}
  },
  mounted() {},
  components: { ToggleCalendar },
  computed: {},
  beforeDestroy() {
    this.$refs._toggleCalendar.close()
  },
  methods: {
    setShow(flag) {
      this.calShow = flag
    },
    show() {
      this.$refs._toggleCalendar.show()
    },
    hide() {
      this.$refs._toggleCalendar.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/varibles.scss";
.cal-warp {
  display: inline-flex;
  align-items: center;
  border: 1px solid $border-color;
  justify-content: center;
}
</style>
