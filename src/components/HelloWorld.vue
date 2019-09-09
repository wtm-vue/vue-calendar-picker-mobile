<template>
  <div class="hello">
    <Calendar v-model="input" placeholder="单选"></Calendar>
    {{input}}
    <br />
    <CalendarRange v-model="input2" start-placeholder="start" end-placeholder="end"></CalendarRange>
    {{input2}}
  </div>
</template>

<script>
export default {
  data() {
    return { input: null, input2: null }
  }
}
</script>

<style lang="scss" scoped>
</style>
