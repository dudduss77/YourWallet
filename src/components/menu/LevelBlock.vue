<template>
  <div class="levelBlock">
    <h3>Oszczędzanie</h3>
    <bar-component content="Level 1" class="levelBlock__levelBar" ></bar-component>
    <h3>Wydawanie</h3>
    <bar-component content="Level 1" class="levelBlock__levelBar"></bar-component>
  </div>
</template>

<script>
import BarComponent from '../reusable/BarComponent.vue'
export default {
  name: "LevelBlock",
  components: {
    BarComponent
  }
}
</script>

<style lang="scss" scoped>
  .levelBlock {
    margin-top: 30px;
    padding: 0 10px;
    &__levelBar {
      margin: 10px 0 20px 0;
    }
  }
</style>