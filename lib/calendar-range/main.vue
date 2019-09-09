
<template>
  <CalBase @confirm="confirmHandler" ref="_calBase" :type="type">
    <VDMInput v-bind="$attrs" :value="getDispalyValue(0)" :placeholder="startPlaceholder" @click="handleClick" />
    ~
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
    return {
      type: PICKER_TYPE.DATE_RANGE,
      userInput: []
    }
  },
  components: {
    VDMInput
  },
  props: {
    value: Array,
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
</style>


