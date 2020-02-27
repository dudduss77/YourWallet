<template>
  <div class="smallBlock">
    <div class="smallBlock__header">{{title}}</div>
    <div class="smallBlock__content">
      <h2>{{moneyCount}}</h2>
      </div>
    <div class="smallBlock__bottom">{{bottomText}}</div>
  </div>
</template>

<script>
export default {
  name: "SmallBlock",
  props: {
    title: String,
    moneyCount: String,
    bottomText: String
  }
}
</script>

<style lang="scss" scoped>
  .smallBlock {
    width: 250px;
    height: 100px;
    background: #F1F1F2;
    box-shadow: 0px 0px 4px #555;
    display: flex;
    flex-direction: column;
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      background: #3D4A64;
    }
    &__content {
      width: 100%;
      color: #555;
      font-size: 1em;
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__bottom {
      width: 100%;
      color: #888888;
      padding: 5px 0;
      text-align: center;
    }
  }
</style>