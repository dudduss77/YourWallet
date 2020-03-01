<template>
  <div class="registerBlock">
    <div class="registerBlock__header">{{title}}</div>
    <div class="registerBlock__content">
      <input-block labelName="Podaj adres email" inputType="text"/>
      <input-block labelName="Podaj Hasło" inputType="password"/>
      <input-block labelName="Powtórz Hasło" inputType="password"/>
      <input-block labelName="Imię lub Nick" inputType="text"/>
      <button-component class="registerBlock__content__button" title="Zarejestruj się"/>
      <button-component :buttonFunc="this.returnToLogin" class="registerBlock__content__button--returnToLogin" title="Powrót do logowania"/>
    </div>
  </div>
</template>

<script>
import InputBlock from '../login/InputBlock.vue'
import ButtonComponent from '../reusable/ButtonComponent.vue'

export default {
  name: 'RegisterBlock',
  props: {
    title: String
  },
  components: {
    InputBlock,
    ButtonComponent
  },
  methods: {
    returnToLogin() {
      this.$emit('changeState');
    }
  }
}
</script>

<style lang="scss" scoped>
  .registerBlock {
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
          &--returnToLogin {
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