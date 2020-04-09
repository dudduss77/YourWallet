<template>
  <div class="inMoney">
    <div class="inMoney__form">
      <div class="inMoney__form__header">Wpłać pieniądze</div>
      <h3 class="inMoney__form__errMsg">{{errMsg}}</h3>
      <input-block v-model="inputData" style="padding: 0" labelName="Nazwa Wydatku" inputType="text"/>
      <button-component :buttonFunc="depositMoney" class="inMoney__form__button" title="Wpłać" />
      <button-component :buttonFunc="this.cancelClick" style="margin-top: 0" class="inMoney__form__button" title="Anuluj" />
    </div>
  </div>
</template>

<script>
import InputBlock from '../reusable/InputBlock.vue'
import ButtonComponent from '../reusable/ButtonComponent.vue'

export default {
  name: 'InMoney',
  props: {
    editValue: Object
  },
  data() {
    return {
      inputData: '',
      errMsg: ''
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  },
  methods: {
    cancelClick() {
      this.$emit('inMoney');
    },
    depositMoney(){
      if((this.inputData) && (!isNaN(this.inputData))) {
        console.log(this.editValue);
        this.errMsg = '';
        this.$emit('inMoney');
      } else {
        this.errMsg = "Podaj liczbę";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .inMoney {
    position: absolute;
  top: 0;
  left: 0;
  background: rgba(100, 100, 100, 0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 300px;
    background: #f1f1f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px #555;
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      background: #3d4a64;
      font-size: 1.5em;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
    &__button {
      margin: 20px 0;
    }
  }
  }
</style>