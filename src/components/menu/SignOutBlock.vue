<template>
  <div class="signOutBlock">
    <font-awesome-icon icon="sign-out-alt" />
  </div>
</template>

<script>
export default {
  name: "SignOutBlock"
}
</script>

<style lang="scss" scoped>
  .signOutBlock {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    background: #3D4A64;
    cursor: pointer;
  }
</style>