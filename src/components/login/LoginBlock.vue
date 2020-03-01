<template>
  <div class="loginBlock">
    <div class="loginBlock__header">{{title}}</div>
    <div class="loginBlock__content">
      <input-block labelName="Adres e-mail" inputType="text"/>
      <input-block labelName="Hasło" inputType="password"/>
      <h3 class="loginBlock__content__link">Zapomniałem hasła</h3>
      <button-component class="loginBlock__content__button" title="Zaloguj się"/>
      <h3 class="loginBlock__content__text">Nie masz konta?</h3>
      <button-component :buttonFunc="this.registerButton" class="loginBlock__content__button--register" title="Zarejestruj się"/>
    </div>
  </div>
</template>

<script>
import InputBlock from '../login/InputBlock.vue'
import ButtonComponent from '../reusable/ButtonComponent.vue'

export default {
  name: 'LoginBlock', 
  props: {
    title: String
  },
  methods: {
    registerButton() {
      this.$emit('changeState');
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
    }
  }
</style>