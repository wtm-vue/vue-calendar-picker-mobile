<template>
  <div class="hello">
    日单选: <Calendar v-model="input" placeholder="单选"></Calendar>
    {{input}}
    <br />
    日区间:<CalendarRange v-model="input2" start-placeholder="start" end-placeholder="end"></CalendarRange>
    {{input2}}
    <br />
    月单选:<CalendarMonth v-model="input3"></CalendarMonth>
    <br />
    月区间:<CalendarMonthRange v-model="input4"></CalendarMonthRange>
    <br />
    年单选:<CalendarYear></CalendarYear>
    <br />
    年区间:<CalendarYearRange></CalendarYearRange>

  </div>
</template>

<script>
export default {
  data() {
    return { input: null, input2: null, input3: null, input4: null }
  }
}
</script>

<style lang="scss" scoped>
</style>
