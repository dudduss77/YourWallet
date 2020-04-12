<template>
  <div class="barComponent">
    <b-progress :value="50" variant="info" :striped="false" class="bar"></b-progress>
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