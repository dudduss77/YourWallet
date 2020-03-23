<template>
  <div class="addComponent">
    <div class="addComponent__form">
      <div class="addComponent__form__header">Dodaj</div>
      <h3 class="addComponent__form__errMsg">{{this.errMsg}}</h3>
      <label class="addComponent__form__label">Dodaj</label>
      <select v-model="selected" class="addComponent__form__select">
        <option value="expense">Wydatek</option>
        <option value="goal">Cel</option>
      </select>

      <div class="addComponent__form__wrapper" v-if="selected == 'expense'">
        <input-block v-model="expense.name" labelName="Nazwa wydatku" inputType="text"/>
        <label style="margin-top: 20px" class="addComponent__form__label">Kategoria</label>
        <select v-model="expense.category" class="addComponent__form__select">

          <option v-for="item in cat" :key="item.id" :value="item.val">{{item.name}}</option>
          
        </select>
        <input-block v-model="expense.price" labelName="Cena" inputType="text"/>
      </div>

      <div class="addComponent__form__wrapper" v-if="selected == 'goal'">
        <input-block v-model="goal.name" labelName="Nazwa celu" inputType="text"/>
        <input-block  v-model="goal.cost" labelName="Ile do uzbierania" inputType="text"/>
      </div>
      
      <button-component :buttonFunc="this.addMethod" class="addComponent__form__button" title="Dodaj"/>
      <button-component :buttonFunc="this.addChange" style="margin-bottom: 20px" class="addComponent__form__button" title="Anuluj"/>
    </div>
  </div>
</template>

<script>
import InputBlock from '../reusable/InputBlock.vue'
import ButtonComponent from '../reusable/ButtonComponent.vue'
import db from '../../db/db.json'
export default {
  name: 'AddComponent',
  data() {
    return {
      selected: "expense",
      errMsg: "",
      expense: {
        name: "",
        category: "eat",
        price: null,
      },
      goal: {
        name: "",
        cost: null
      },
      cat: db
    }
  },
  methods: {
    addMethod() {
      var numbers = /^[0-9]+$/;
      if(this.selected == "expense") {
        if((this.expense.name) && (this.expense.category) && (this.expense.price) && (this.expense.price.match(numbers))) {
          //alert(this.expense.name + " " + this.expense.category + " " + this.expense.price);
          //Api

          this.expense.name = "";
          this.expense.category = "eat";
          this.expense.price = null;
        } else {
          this.errMsg = "Wszystkie pola wymagane"
        }
      } else {
        if((this.goal.name) && (this.goal.cost) && (this.goal.cost.match(numbers))) {
          //alert(this.goal.name + " " + this.goal.cost);
          //Api

          this.goal.name = "";
          this.goal.cost = null;
        } else {
          this.errMsg = "Wszystkie pola wymagane"
        }
      }
    },
    addChange() {
      this.expense.name = "";
      this.expense.category = "eat";
      this.expense.price = null;
      this.goal.name = "";
      this.goal.cost = null;
      this.$emit('addChange');
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  }
}
</script>

<style lang="scss" scoped>
  .addComponent {
    position: absolute;
    background: rgba(100, 100, 100, 0.5);
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    &__form {
      width: 300px;
      background: #F1F1F2;
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
      background: #3D4A64;
      font-size: 1.5em;
    }
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__errMsg {
        color: #ff0000;
        margin-top: 10px;
        height: 29px;
      }
    &__label {
      color: #555;
      margin-bottom: 10px;
    }
    &__select {
      width: 250px;
      padding: 5px;
      border: none;
      border: 1px solid #888;
      margin-top: 10px;
      text-align: center;
      font-family: 'Roboto', sans-serif;
    }
    &__button {
      margin: 10px 0;
    }
    }
  }
</style>