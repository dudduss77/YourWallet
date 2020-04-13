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
        <input-block v-model="expense.name" labelName="Nazwa wydatku" inputType="text" />
        <input-block v-model="expense.date" labelName="Data" inputType="date" />
        <label style="margin-top: 20px" class="addComponent__form__label">Kategoria</label>
        <select v-model="expense.category" class="addComponent__form__select">
          <option v-for="item in cat" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        <input-block v-model="expense.price" labelName="Cena" inputType="text" />
      </div>

      <div class="addComponent__form__wrapper" v-if="selected == 'goal'">
        <input-block v-model="goal.name" labelName="Nazwa celu" inputType="text" />
        <input-block v-model="goal.cost" labelName="Ile do uzbierania" inputType="text" />
      </div>

      <button-component
        :buttonFunc="this.addMethod"
        class="addComponent__form__button"
        title="Dodaj"
      />
      <button-component
        :buttonFunc="this.addChange"
        style="margin-bottom: 20px"
        class="addComponent__form__button"
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
  name: "AddComponent",
  data() {
    return {
      selected: "expense",
      errMsg: "",
      expense: {
        name: "",
        date: "",
        category: 0,
        price: null
      },
      goal: {
        name: "",
        cost: null
      },
      userData: {
        firstName: "", //Pobranie danych z bazy
        name: "", //Pobranie danych z bazy
        edit: false,
        email: "",
        userUid: "",
        budget: "",
        savings: "",
        saveAll: true,
        allExpenses: ""
      },
      cat: []
    };
  },
  created() {
    var thisVar = this;
    thisVar.userData.userUid = firebase.auth().currentUser.uid;
    var db = firebase.firestore();

        db.collection("users")
      .doc(thisVar.userData.userUid)
      .onSnapshot(function(doc) {
        thisVar.userData.firstName = doc.data().name;
        thisVar.userData.name = doc.data().surname;
        thisVar.userData.budget = parseFloat(doc.data().budget);
        thisVar.userData.savings = doc.data().savings;
        thisVar.userData.saveAll = doc.data().saveAll;
        thisVar.userData.allSavings = doc.data().allSaving;
        thisVar.userData.allExpenses = doc.data().allExpenses;

      });
    this.getCategory();
  },
  methods: {
    getCategory() {
      console.log("wywołuje getCategory");
      var tmpD = new Date();
      this.expense.date =
        tmpD.getFullYear() +
        "-" +
        (tmpD.getMonth() < 9
          ? "0" + (tmpD.getMonth() + 1)
          : tmpD.getMonth() + 1) +
        "-" +
        (tmpD.getDate() < 9 ? "0" + tmpD.getDate() : tmpD.getDate());
      console.log(this.expense.date);
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("category")
        .get()
        .then(function(querySnapshot) {
          const tab = [];
          querySnapshot.forEach(function(doc) {
            tab.push({ id: doc.id, name: doc.data().name });
          });

          thisVar.cat = tab;
          console.log(thisVar.cat);
        });
    },
    addMethod() {
      console.log();
      var thisVar = this;
      if (this.selected == "expense") {
        if (
          this.expense.name &&
          this.expense.date &&
          this.expense.category &&
          this.expense.price &&
          !isNaN(this.expense.price)
        ) {
          //alert(this.expense.name + " " + this.expense.category + " " + this.expense.price);
          //Api dodawanie wydatku
          console.log(this.expense.date);
          const tmpDate = new Date(this.expense.date);
          firebase
            .firestore()
            .collection("users")
            .doc(thisVar.userData.userUid)
            .collection("expenses")
            .add({
              name: thisVar.expense.name,
              date: tmpDate,
              category: thisVar.expense.category,
              price: thisVar.expense.price
            })
            .then(function() {
              firebase.firestore()
            .collection("users")
            .doc(thisVar.userData.userUid)
            .update({allExpenses: (parseFloat(thisVar.userData.allExpenses) + parseFloat(thisVar.expense.price)).toString()});
              console.log("Dodano wydatek");
              thisVar.expense.name = "";
              thisVar.expense.category = "eat";
              thisVar.expense.price = null;
              thisVar.goal.name = "";
              thisVar.goal.cost = null;
              thisVar.$emit("addChange");
            });
          this.errMsg = "";
        } else {
          this.errMsg = "Wszystkie pola wymagane";
        }
      } else {
        if (this.goal.name && this.goal.cost && !isNaN(this.goal.cost)) {
          //alert(this.goal.name + " " + this.goal.cost);
          //Api dodawanie celu
          firebase
            .firestore()
            .collection("users")
            .doc(thisVar.userData.userUid)
            .collection("goal")
            .add({
              allMoney: thisVar.goal.cost,
              name: thisVar.goal.name,
              nowMoney: "0"
            })
            .then(function() {
              console.log("Dodano cel");
              thisVar.expense.name = "";
              thisVar.expense.category = "eat";
              thisVar.expense.price = null;
              thisVar.goal.name = "";
              thisVar.goal.cost = null;
              thisVar.$emit("addChange");
            });
          this.goal.name = "";
          this.goal.cost = null;
          this.errMsg = "";
        } else {
          this.errMsg = "Wszystkie pola wymagane";
        }
      }
    },
    addChange() {
      this.expense.name = "";
      this.expense.category = "eat";
      this.expense.price = null;
      this.goal.name = "";
      this.goal.cost = null;
      this.$emit("addChange");
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  }
};
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
      font-family: "Roboto", sans-serif;
    }
    &__button {
      margin: 10px 0;
    }
  }
}
</style>