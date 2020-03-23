<template>
  <div class="logo">
    <h2 class="logo__title">TwójPortfel</h2>
  </div>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style lang="scss" scoped>
  .logo {
    position: relative;
    z-index: 2;
    background: #3D4A64;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    &__title {
      margin-left: 30px;
    }
  }
</style>