<template>
  <div class="headerBlock">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: "HeaderBlock",
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
  .headerBlock {
    color: #555;
  }
</style>