<template>
  <div class="barComponent">
    <h4 class="barComponent__content">{{content}}</h4>
  </div>
</template>

<script>
export default {
  name: "BarComponent",
  props: {
    content: String
  }
}
</script>

<style lang="scss" scoped>
  .barComponent {
    width: 100%;
    height: 15px;
    background: #fff;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__content {
      color: #555;
    }
  }
</style>