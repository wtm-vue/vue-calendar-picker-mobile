<template>
  <div class="base-input">
    <input type="text" v-bind="$attrs" readonly v-on="inputListeners">
  </div>
</template>

<script type="text/babel">
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
.base-input {
  display: inline-block;
  width: 45%;
}
input {
  outline: 0;
  font-size: inherit;
  width: 100%;
  text-align: center;
}
</style>