
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

import { PICKER_TYPE } from "../utils/const"
export default {
  name: "CalendarRange",
  mixins: [BASE],
  data() {
    return {}
  },
  components: {
    VDMInput
  },
  props: {
    value: Array,
    type: {
      type: String,
      default: PICKER_TYPE.DATE_RANGE
    },
    rangeSeparator: {
      type: String,
      default: "至"
    },
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
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


