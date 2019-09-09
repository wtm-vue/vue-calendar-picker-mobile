<template>
  <div class="hello">
    <Calendar v-model="input"></Calendar>
    {{input}}
  </div>
</template>

<script>
export default {
  data() {
    return { input: new Date() }
  }
}
</script>

<style lang="scss" scoped>
</style>
