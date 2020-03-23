<template>
  <div class="linkBlock">
    <router-link class="linkBlock__link" :to="linkTo">{{linkName}}</router-link>
  </div>
</template>

<script>
export default {
  name: "LinkBlock",
  props: {
    linkName: String,
    linkTo: String
  }
}
</script>

<style lang="scss" scoped>
  .linkBlock {
    &__link {
      color: #fff;
      text-decoration: none;
      font-size: 1.3em;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0;
      padding-left: 10px;
    }
    &:hover {
        background: #3D4A64;
    }
  }
</style>