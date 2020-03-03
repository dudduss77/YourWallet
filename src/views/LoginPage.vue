<template>
  <div class="loginPage">
    <header-block title="Twój Portfel" class="loginPage__logo"/>
    <!-- <header-block title="Wszystko zależy od ciebie" class="loginPage__header"/> -->
    <login-block v-if="register===false" v-on:changeState="this.setRegister" class="loginPage__login" title="Logowanie"/>
    <register-block v-if="register" v-on:changeState="this.setRegister" class="loginPage__register" title="Rejestracja"/>

    <div class="loginPage__leftWrapper">
      <img src="../assets/LoginPage1.jpg" alt="Zdjęcie 1" class="loginPage__leftWrapper__photoBig"/>
      <img src="../assets/LoginPage3.jpg" alt="Zdjęcie 1" class="loginPage__leftWrapper__photoSmall"/>
    </div>
    <div class="loginPage__rightWrapper">
      <img src="../assets/LoginPage2.jpg" alt="Zdjęcie 1" class="loginPage__rightWrapper__photoBig"/>
      <img src="../assets/LoginPage5.jpg" alt="Zdjęcie 1" class="loginPage__rightWrapper__photoSmall"/>
    </div>
  </div>
</template>

<script>
import HeaderBlock from '../components/reusable/HeaderBlock.vue'
import LoginBlock from '../components/login/LoginBlock.vue'
import RegisterBlock from '../components/login/RegisterBlock.vue'

export default {
  name: 'LoginPage',
  components: {
    HeaderBlock,
    LoginBlock,
    RegisterBlock
  },
  data() {
    return {
      register: false
    }
  },
  methods: {
    setRegister() {
      this.register = !this.register
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginPage {
    background: #E7E7E8;
    width: 100vw;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 
    "logo logo logo"
    "leftWrapper inputBlock rightWrapper";
    position: absolute;
    overflow-y: auto;
    &__logo {
      grid-area: logo;
      color: #fff;
      height: 60px;
      background: #3D4A64;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
      width: 100%;
    }
    &__header {
        color: #888;
        grid-area: headerTop;
        justify-self: center;
        align-self: center;
      }
    &__login, &__register {
      grid-area: inputBlock;
      justify-self: center;
      align-self: center;
    }
    &__leftWrapper {
      grid-area: leftWrapper;
    }
    &__rightWrapper {
      grid-area: rightWrapper;
    }
    &__leftWrapper, &__rightWrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      &__photoBig {
        justify-self: center;
        align-self: center;
        box-shadow: 0 0 2px #555;
        max-width: 90%;
      }
      &__photoSmall {
        justify-self: center;
        align-self: center;
        box-shadow: 0 0 2px #555;
        margin-top: 10px;
        max-width: 90%;
      }
    } 
  }
</style>