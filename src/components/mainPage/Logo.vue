<template>
  <div class="logo">
    <h2 class="logo__title">TwójPortfel</h2>
    <div @click="$emit('addChange')" class="logo__add"><font-awesome-icon icon="plus" /></div>
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
      flex: 1 1 auto;
    }
    &__add {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2em;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>