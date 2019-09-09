import CalBase from "../Base.vue"
import { formatDate2Str } from "../utils/date"

import { PICKER_TYPE } from "./const"
export const BASE = {
  data() {
    return {}
  },
  props: {},
  components: { CalBase },
  watch: {
    value: {
      handler: function(val) {
        this.userInput = val ? (Array.isArray(val) ? val : [val]) : []
      },
      immediate: true
    }
  },
  methods: {
    confirmHandler(cv) {
      this.$emit("input", this.type === PICKER_TYPE.DATE_RANGE ? cv : cv[0])
      this.userInput = cv
      this.$refs._calBase.hide()
    },
    handleClick() {
      this.$refs._calBase.show()
      this.$emit("click", this)
    },
    getDispalyValue(index = 0) {
      return formatDate2Str(this.userInput[index])
    }
  }
}
