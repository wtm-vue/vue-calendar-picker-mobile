<template>
  <CalBase @confirm="confirmHandler" ref="_calBase" :type="type" :userInput="userInput">
    <VDMInput :value="getDispalyValue()" v-bind="$attrs" :placeholder="placeholder" @click="handleClick" />
  </CalBase>
</template>

<script type="text/babel">
import VDMInput from "../input/main.vue"
import { BASE } from "../utils/mixins"
import { DATE_FORMAT, PICKER_TYPE } from "../utils/const"
export default {
  name: "CalendarMonth",
  mixins: [BASE],
  data() {
    return { type: PICKER_TYPE.MONTH }
  },
  components: {
    VDMInput
  },
  props: {
    value: [Object, Array, Date],
    format: {
      type: String,
      default: DATE_FORMAT.YYYY_MM
    },
    placeholder: {
      type: String,
      default: "选择日份"
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