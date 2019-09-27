
<template>
  <CalBase @confirm="confirmHandler" ref="_calBase" :type="type" v-bind="$attrs" :userInput="userInput">
    <VDMInput v-bind="$attrs" :value="getDispalyValue(0)" :placeholder="startPlaceholder" @click="handleClick" />
    <span class="separator">{{rangeSeparator}}</span>
    <VDMInput v-bind="$attrs" :value="getDispalyValue(1)" :placeholder="endPlaceholder" @click="handleClick" />
  </CalBase>
</template>
<script type="text/babel">
import VDMInput from "../input/main.vue"
import { BASE } from "../utils/mixins"

import { PICKER_TYPE, DATE_FORMAT } from "../utils/const"
export default {
  name: "CalendarYearRange",
  mixins: [BASE],
  data() {
    return {
      type: PICKER_TYPE.YEAR_RANGE
    }
  },
  components: {
    VDMInput
  },
  props: {
    format: {
      type: String,
      default: DATE_FORMAT.YYYY
    },
    rangeSeparator: {
      type: String,
      default: "至"
    },
    startPlaceholder: {
      type: String,
      default: "开始年份"
    },
    endPlaceholder: {
      type: String,
      default: "结束年份"
    }
  },

  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "../styles/varibles.scss";
.separator,
.base-input {
  vertical-align: middle;
}
</style>


