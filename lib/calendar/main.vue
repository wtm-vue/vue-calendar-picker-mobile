<template>
  <CalBase @confirm="confirmHandler" ref="_calBase">
    <VDMInput :value="getDispalyValue()" v-bind="$attrs" @click="handleClick" />
  </CalBase>
</template>

<script type="text/babel">
import VDMInput from "../input/main.vue"
import { BASE } from "../utils/mixins"
export default {
  name: "Calendar",
  mixins: [BASE],
  data() {
    return {
      userInput: []
    }
  },
  components: {
    VDMInput
  },
  props: {
    value: [Object, Array, Date]
  },
  mounted() {},
  methods: {},

  computed: {}
}
</script>

<style lang="scss" scoped>
@import "../styles/varibles.scss";
</style>