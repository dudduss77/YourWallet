<template>
  <div class="mainPage">
    <Logo v-on:addChange="this.addShow" class="mainPage__logo"></Logo>
    <Menu class="mainPage__menu"></Menu>
    <add-component v-on:addChange="this.addShow"  v-if="addState"/>
    <router-view class="mainPage__content"/>
  </div>
</template>

<script>
import Logo from '../components/mainPage/Logo.vue'
import Menu from '../components/mainPage/Menu.vue'
import AddComponent from '../components/add/AddComponent.vue'
export default {
  name: "MainPage",
  data() {
    return {
      addState: false
    }
  },
  methods: {
    addShow() {
      this.addState = !this.addState;
    }
  },
  components: {
    Logo,
    Menu,
    AddComponent
  }
}
</script>

<style lang="scss" scoped>
  .mainPage {
    width: 100%;
    min-height: 100vh !important;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 
      "logo logo"
      "menuBlock contentBlock";

    &__logo {
      grid-area: logo;
    }
    &__menu {
      grid-area: menuBlock;
    }
    &__content  {
      grid-area: contentBlock;
    }
  }
</style>