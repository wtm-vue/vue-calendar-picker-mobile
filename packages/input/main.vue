<template>
  <div class="base-input">
    <input type="text" v-bind="$attrs" readonly v-on.prevent="inputListeners">
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
  width: 100%;
}
input {
  outline: 0;
  font-size: inherit;
  width: 100%;
  text-align: center;
  border: 0;
  outline: 0;
  border-radius: 0;
  height: 100%;
  line-height: normal;
  &::placeholder {
    color: $border-color;
  }
}
</style>