<template>
  <CalBase @confirm="confirmHandler" ref="_calBase" :type="type" :userInput="userInput">
    <VDMInput :value="getDispalyValue()" v-bind="$attrs" :placeholder="placeholder" @click="handleClick" />
  </CalBase>
</template>

<script type="text/babel">
import VDMInput from "../input/main.vue"
import { BASE } from "../utils/mixins-base"
import { DATE_FORMAT, PICKER_TYPE } from "../utils/const"
export default {
  name: "CalendarYear",
  mixins: [BASE],
  data() {
    return { type: PICKER_TYPE.YEAR }
  },
  components: {
    VDMInput
  },
  props: {
    format: {
      type: String,
      default: DATE_FORMAT.YYYY
    },
    placeholder: {
      type: String,
      default: "选择年份"
    }
  },
  mounted() {},
  methods: {},

  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../styles/varibles.scss";
</style>
