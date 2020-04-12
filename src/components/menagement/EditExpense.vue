<template>
  <div class="editExpense">
    <div class="editExpense__form">
      <div class="editExpense__form__header">Edytuj</div>
      <h3 class="editExpense__form__errMsg">{{errMsg}}</h3>
      <input-block v-model="name" style="padding: 0" labelName="Nazwa Wydatku" inputType="text" />
      <input-block v-model="date" labelName="Data" inputType="date" />

      <label style="margin-top: 20px" class="editExpense__form__label">Kategoria</label>
      <select v-model="category" class="editExpense__form__select">
        <option v-for="item in categoryList" :key="item.id" :value="item.id">{{item.name}}</option>
      </select>

      <input-block v-model="price" labelName="Cena" inputType="text" />
      <button-component
        :buttonFunc="this.editExpense"
        class="editExpense__form__button"
        title="Zapisz"
      />
      <button-component
        :buttonFunc="this.cancelClick"
        style="margin-top: 0"
        class="editExpense__form__button"
        title="Anuluj"
      />
    </div>
  </div>
</template>

<script>
import InputBlock from "../reusable/InputBlock.vue";
import ButtonComponent from "../reusable/ButtonComponent.vue";
import firebase from "firebase";

export default {
  name: "EditExpense",
  props: {
    editValue: Object,
    uid: String,
    editCategory: Array
  },
  data() {
    return {
      name: this.editValue.name,
      docId: this.editValue.id,
      date: this.editValue.date,
      category: this.editValue.category,
      price: this.editValue.price,
      categoryList: this.editCategory,
      userId: this.uid,
      errMsg: ""
    };
  },
  methods: {
    cancelClick() {
      this.$emit("expenseEdit");
    },
    editExpense() {
      var thisVar = this;
      if (this.name && this.date && this.price && !isNaN(this.price)) {
        console.log("Data: " + this.date);
        //api edycja wydatku
        var tmp = new Date(thisVar.date);
        firebase
          .firestore()
          .collection("users")
          .doc(thisVar.userId)
          .collection("expenses")
          .doc(tmp.getFullYear().toString())
          .collection((tmp.getMonth() + 1).toString())
          .doc(thisVar.docId)
          .update({
            name: thisVar.name,
            category: thisVar.category,
            date: tmp,
            price: thisVar.price
          })
          .then(function() {
            console.log("Udało się");
          });
        this.errMsg = "";
        this.$emit("expenseEdit");
      } else {
        this.errMsg = "Wypełni wszystkie pola";
      }
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  }
};
</script>

<style lang="scss" scoped>
.editExpense {
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
    &__input {
      padding: 0;
    }
    &__button {
      margin: 20px 0;
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
      font-family: "Roboto", sans-serif;
    }
  }
}
</style>