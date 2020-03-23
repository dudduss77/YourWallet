<template>
  <div class="loginBlock">
    <div class="loginBlock__header">{{title}}</div>
    <div class="loginBlock__content">
      <h3 class="loginBlock__content__errMsg">{{this.user.errMsg}}</h3>
      <input-block style="padding: 0" v-model="user.email" labelName="Adres e-mail" inputType="text"/>
      <input-block v-model="user.password" labelName="Hasło" inputType="password"/>
      <h3 class="loginBlock__content__link">Zapomniałem hasła</h3>
      <button-component :buttonFunc="this.login" class="loginBlock__content__button" title="Zaloguj się"/>
      <h3 class="loginBlock__content__text">Nie masz konta?</h3>
      <button-component :buttonFunc="this.registerButton" class="loginBlock__content__button--register" title="Zarejestruj się"/>
    </div>
  </div>
</template>

<script>
import InputBlock from '../reusable/InputBlock.vue'
import ButtonComponent from '../reusable/ButtonComponent.vue'

export default {
  name: 'LoginBlock', 
  props: {
    title: String
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        errMsg: ""
      }
    }
  },
  methods: {
    registerButton() {
      this.$emit('changeState');
    },
    login() {
      if((this.user.email) && (this.user.password)) {
        //Kod z api lub firebase
      } else {
        this.user.errMsg = "Wszystkie pola wymagane";
      }
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  }, 
}
</script>

<style lang="scss" scoped>
  .loginBlock {
    width: 300px;
    background: #F1F1F2;
    box-shadow: 0px 0px 4px #555;
    display: flex;
    flex-direction: column;
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #3D4A64;
      font-size: 1.5em;
    }
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__button {
          margin-top: 20px;
          &--register {
            margin: 10px auto 20px auto;
          }
      }
      &__link {
        margin-top: 5px;
        color: #888;
        &:hover {
          cursor: pointer;
        }
      }
      &__text {
        margin-top: 20px;
        color: #888;
      }
      &__errMsg {
        color: #ff0000;
        margin-top: 10px;
        height: 29px;
      }
    }
  }
</style>