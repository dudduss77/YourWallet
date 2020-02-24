<template>
  <div class="mainPage">
    <Logo></Logo>
    <Menu></Menu>
  </div>
</template>

<script>
import Logo from '../components/mainPage/Logo.vue'
import Menu from '../components/mainPage/Menu.vue'
export default {
  name: "MainPage",
  components: {
    Logo,
    Menu
  }
}
</script>

<style lang="scss" scoped>
  .mainPage {
    width: 100%;
    min-height: 100%;
  }
</style>