<template>
  <div class="hello">
    日单选:<Calendar v-model="input" placeholder="单选"></Calendar>
    {{input}}
    <br />
    日区间:<CalendarRange v-model="input2" start-placeholder="start" end-placeholder="end"></CalendarRange>
    {{input2}}
    <br />
    月单选:<CalendarMonth v-model="input3"></CalendarMonth>
    {{input3}}
    <br />
    月区间:<CalendarMonthRange v-model="input4"></CalendarMonthRange>
    {{input4}}
    <br />
    年单选:<CalendarYear v-model="input5"></CalendarYear>
    {{input5}}
    <br />
    年区间:<CalendarYearRange v-model="input6"></CalendarYearRange>
    {{input6}}

  </div>
</template>

<script>
export default {
  data() {
    return { input: null, input2: null, input3: null, input4: null, input5: null, input6: null }
  }
}
</script>

<style lang="scss" scoped>
</style>
