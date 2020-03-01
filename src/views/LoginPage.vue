<template>
  <div class="loginPage">
    <header-block title="Twój Portfel" class="loginPage__logo"/>
    <!-- <header-block title="Wszystko zależy od ciebie" class="loginPage__header"/> -->
    <login-block v-if="register===false" v-on:changeState="this.setRegister" class="loginPage__login" title="Logowanie"/>
    <register-block v-if="register" v-on:changeState="this.setRegister" class="loginPage__register" title="Rejestracja"/>
    <img src="../assets/LoginPage1.jpg" alt="Zdjęcie 1" class="loginPage__photoBig loginPage--photo1"/>
    <img src="../assets/LoginPage2.jpg" alt="Zdjęcie 1" class="loginPage__photoBig loginPage--photo2"/>
    <img src="../assets/LoginPage3.jpg" alt="Zdjęcie 1" class="loginPage__photoSmall loginPage--photo3"/>
    <img src="../assets/LoginPage4.jpg" alt="Zdjęcie 1" class="loginPage__photoBig loginPage--photo4"/>
    <img src="../assets/LoginPage5.jpg" alt="Zdjęcie 1" class="loginPage__photoSmall loginPage--photo5"/>
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 60px 25px 488px 1fr;
    grid-template-areas: 
    "logo logo logo"
    "headerTop headerTop headerTop"
    "photo1 inputBlock photo2"
    "photo3 photo4 photo5";
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
    &__photoBig {
      justify-self: center;
      align-self: center;
      box-shadow: 0 0 2px #555;
    }
    &__photoSmall {
      justify-self: center;
      align-self: center;
      box-shadow: 0 0 2px #555;
    }
    &--photo1 {
      grid-area: photo1;
    }
    &--photo2 {
      grid-area: photo2;
    }
    &--photo3 {
      grid-area: photo3;
    }
    &--photo4 {
      grid-area: photo4;
      margin-top: 10px;
    }
    &--photo5 {
      grid-area: photo5;
    }
  }
</style>