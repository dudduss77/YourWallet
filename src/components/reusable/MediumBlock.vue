<template>
  <div class="mediumBlock">
    <div class="mediumBlock__header">{{title}}</div>
    <div class="mediumBlock__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediumBlock",
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
  .mediumBlock {
    width: 400px;
    height: 250px;
    background: #F1F1F2;
    box-shadow: 0px 0px 4px #555;
    display: flex;
    flex-direction: column;
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #3D4A64;
      font-size: 1.5em;
    }
    &__content {
      overflow-y: auto;
      overflow-x: hidden;
      // scrollbar-width: 1px;
      height: 200px;
      color: #888;
    }
  }
</style>