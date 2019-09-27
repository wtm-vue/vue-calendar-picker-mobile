<template>
  <CalBase @confirm="confirmHandler" ref="_calBase" :userInput="userInput" :type="type">
    <VDMInput :value="getDispalyValue()" v-bind="$attrs" :placeholder="placeholder" @click="handleClick" />
  </CalBase>
</template>

<script type="text/babel">
import VDMInput from "../input/main.vue"
import { BASE } from "../utils/mixins"
import { DATE_FORMAT, PICKER_TYPE } from "../utils/const"
export default {
  name: "Calendar",
  mixins: [BASE],
  data() {
    return { type: PICKER_TYPE.DATE }
  },
  components: {
    VDMInput
  },
  props: {
    value: [Object, Array, Date],
    format: {
      type: String,
      default: DATE_FORMAT.YYYY_MM_DD
    },
    placeholder: {
      type: String,
      default: "选择日期"
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