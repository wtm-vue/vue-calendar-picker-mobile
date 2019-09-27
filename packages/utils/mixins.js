import CalBase from "../Base.vue"
import { formatDate2Str } from "../utils/date"

import { PICKER_TYPE } from "./const"
export const BASE = {
  data() {
    return { userInput: [] }
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
      this.$emit("input", [PICKER_TYPE.DATE_RANGE, PICKER_TYPE.MONTH_RANGE, PICKER_TYPE.YEAR_RANGE].indexOf(this.type) > -1 ? cv : cv[0])
      this.userInput = cv
      this.$refs._calBase.hide()
      this.$emit("change", cv)
    },
    handleClick() {
      this.$refs._calBase.show()
      this.$emit("click", this)
    },
    getDispalyValue(index = 0) {
      return formatDate2Str(this.userInput[index], this.format)
    }
  }
}
