<template>
  <div class="base-input">
    <input type="text" v-bind="$attrs" readonly v-on="inputListeners">
  </div>
</template>

<script type="text/babel">
import { WEEKS } from "../utils/const"
import { getFullMonthInfo } from "../utils/date"

export default {
  name: "Input",
  inheritAttrs: false,
  props: {},
  data() {
    return {}
  },
  watch: {},
  mounted() {},
  methods: {},

  computed: {
    inputListeners: function() {
      let _this = this
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          _this.$emit("input", event.target.value)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/varibles.scss";
input {
  outline: 0;
}
</style>