<template>
  <div class="management">
    <medium-block class="management__budget" title="Miesięczny budżet">
      <h3 class="management__budget__errMsg">{{saveBudget.errMsg}}</h3>
      <h3 class="management__budget__goodMsg">{{saveBudget.goodMsg}}</h3>
      <input-block
        style="padding: 0"
        v-model="saveBudget.budget"
        labelName="Ustal miesięczny budżet"
        inputType="text"
      />
      <button-component
        :buttonFunc="this.budgetSave"
        class="management__budget__button"
        title="Zapisz"
      />
    </medium-block>

    <medium-block title="Edycja celi">
      <goal-manage
        v-for="item in goalEdit.goalList"
        :key="item.id"
        :title="item.name"
        :money="item.nowMoney"
        :allMoney="item.allMoney"
        :uid="userData.userUid"
        v-on:inMoney="showInMoney(item)"
        v-on:editGoal="editGoal(item)"
        v-on:delGoal="deleteGoal(item)"
      />
    </medium-block>

    <medium-block class="management__saveMoney" title="Oszczędzanie">
      <h3 class="management__saveMoney__errMsg">{{saveMoney.errMsg}}</h3>
      <h3 class="management__saveMoney__goodMsg">{{saveMoney.goodMsg}}</h3>
      <div class="management__saveMoney__wrapper">
        <input
          v-model="saveMoney.saveType"
          type="radio"
          name="saveMoney"
          id="one"
          value="one"
          checked
        />
        <label for="one">Odkładaje resztę z miesiąca</label>
      </div>
      <div class="management__saveMoney__wrapper">
        <input v-model="saveMoney.saveType" type="radio" name="saveMoney" id="two" value="two" />
        <label for="two">Odkładaj co miesiąć pewną sume</label>
      </div>
      <input-block
        v-model="saveMoney.moneyCount"
        class="management__saveMoney__input"
        inputType="text"
      />
      <button-component
        :buttonFunc="this.moneySave"
        class="management__saveMoney__button"
        title="Zapisz"
      />
    </medium-block>

    <medium-block class="management__expense" title="Edycja wydatków">
      <expen-item
        v-for="item in expenseEdit.expenseList"
        :key="item.id"
        :date="item.date"
        :title="item.name"
        :price="item.price + ' PLN'"
        v-on:expenseEdit="editExpense(item)"
        v-on:expenseDel="deleteExpense(item)"
      />
    </medium-block>

    <medium-block class="management__category" title="Kategorie">
      <div class="management__category__wrapper">
        <item-component
          v-for="item in categoryEdit.categoryList"
          :key="item.id"
          :category="item.name"
          v-on:catEdit="editCategory(item)"
          v-on:catDel="deleteCategory(item)"
        />
      </div>

      <button-component
        :buttonFunc="this.addCategory"
        class="management__category__button"
        title="Dodaj"
      />
    </medium-block>
    <edit-cat
      :editValue="categoryEdit.catProp"
      :uid="userData.userUid"
      :add="false"
      v-if="categoryEdit.catEdit"
      v-on:catEdit="editCategory"
      v-on:catUpdate="getCategory()"
      name="Edytuj"
    />
    <edit-cat
      :editValue="categoryEdit.catProp"
      :uid="userData.userUid"
      :add="true"
      v-if="categoryEdit.catAdd"
      v-on:catEdit="addCategory"
      v-on:catUpdate="getCategory()"
      name="Dodaj"
    />

    <edit-goal
      :editValue="goalEdit.goalProp"
      :uid="userData.userUid"
      v-if="goalEdit.goaEdit"
      v-on:editGoal="editGoal"
    />

    <edit-expense
      :editValue="expenseEdit.expenseProp"
      :uid="userData.userUid"
      :editCategory="categoryEdit.categoryList"
      v-if="expenseEdit.expenseEdit"
      v-on:expenseEdit="editExpense"
    />

    <in-money
      :editValue="inMoney.inProp"
      :uid="userData.userUid"
      v-if="inMoney.inState"
      v-on:inMoney="showInMoney"
    />
  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import InputBlock from "../components/reusable/InputBlock.vue";
import ButtonComponent from "../components/reusable/ButtonComponent.vue";
import ItemComponent from "../components/menagement/ItemComponent.vue";
import GoalManage from "../components/menagement/GoalManage.vue";
import ExpenItem from "../components/menagement/ExpenItem.vue";
import EditCat from "../components/menagement/EditCat.vue";
import EditGoal from "../components/menagement/EditGoal.vue";
import EditExpense from "../components/menagement/EditExpense.vue";
import InMoney from "../components/menagement/InMoney.vue";

import expense from "../db/expense.json";
import firebase from "firebase";

export default {
  name: "Management",
  created() {
    var thisVar = this;
    thisVar.userData.userUid = firebase.auth().currentUser.uid;
    var db = firebase.firestore();

    // pobieranie kategorii
    this.getCategory();

    //pobieranie celi
    this.getGoal();

    //pobieranie wydatków
    this.getExpenses();
    //pobieranie danych usera
    db.collection("users")
      .doc(thisVar.userData.userUid)
      .get()
      .then(function(doc) {
        thisVar.userData.firstName = doc.data().name;
        thisVar.userData.name = doc.data().surname;
        thisVar.userData.budget = doc.data().budget;
        thisVar.userData.savings = doc.data().savings;
        thisVar.userData.saveAll = doc.data().saveAll;
        thisVar.saveBudget.budget = thisVar.userData.budget;
        thisVar.saveMoney.moneyCount = doc.data().savings;
      });
  },
  data() {
    return {
      saveBudget: {
        budget: "",
        errMsg: "",
        goodMsg: ""
      },
      saveMoney: {
        saveType: "one",
        moneyCount: "50",
        errMsg: ""
      },
      categoryEdit: {
        categoryList: [],
        catEdit: false,
        catAdd: false,
        catProp: {}
      },

      goalEdit: {
        goalList: [],
        goaEdit: false,
        goalProp: {}
      },

      expenseEdit: {
        expenseList: expense,
        expenseEdit: false,
        expenseProp: {}
      },

      inMoney: {
        inState: false,
        inProp: {}
      },
      userData: {
        firstName: "", //Pobranie danych z bazy
        name: "", //Pobranie danych z bazy
        edit: false,
        email: "",
        userUid: "",
        budget: "",
        savings: "",
        saveAll: true
      }
    };
  },
  methods: {
    getExpenses() {
      console.log("wywołuje getGoal");
      var tmpD = new Date();
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("expenses")
        .doc(tmpD.getFullYear().toString())
        .collection((tmpD.getMonth() + 1).toString())
        .get()
        .then(function(querySnapshot) {
          const tab = [];
          var time;
          var tmp;
          querySnapshot.forEach(function(doc) {
            time = new Date(doc.data().date.seconds * 1000);
            console.log("Data 1: " + time);
            tmp =
              time.getFullYear() +
              "-" +
              (time.getMonth() < 9
                ? "0" + (time.getMonth() + 1)
                : time.getMonth() + 1) +
              "-" +
              (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());

            tab.push({
              id: doc.id,
              name: doc.data().name,
              category: doc.data().category,
              date: tmp,
              price: doc.data().price
            });
          });
          thisVar.expenseEdit.expenseList = tab;
        });
    },
    getGoal() {
      console.log("wywołuje getGoal");
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("goal")
        .get()
        .then(function(querySnapshot) {
          const tab = [];
          querySnapshot.forEach(function(doc) {
            tab.push({
              id: doc.id,
              name: doc.data().name,
              nowMoney: doc.data().nowMoney,
              allMoney: doc.data().allMoney
            });
          });

          thisVar.goalEdit.goalList = tab;
        });
    },
    getCategory() {
      console.log("wywołuje getCategory");
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

          thisVar.categoryEdit.categoryList = tab;
        });
    },
    budgetSave() {
      if (this.saveBudget.budget && !isNaN(this.saveBudget.budget)) {
        //Api zapis budżetu
        var thisVar = this;
        firebase
          .firestore()
          .collection("users")
          .doc(this.userData.userUid)
          .update({ budget: this.saveBudget.budget })
          .then(function() {
            thisVar.saveBudget.goodMsg = "Zaktualizowano Dane";
            thisVar.saveBudget.errMsg = "";
          });
      } else {
        thisVar.saveBudget.goodMsg = "";
        this.saveBudget.errMsg = "Podaj liczbę";
      }
    },
    moneySave() {
      var thisVar = this;
      if (this.saveMoney.saveType == "two") {
        if (this.saveMoney.moneyCount && !isNaN(this.saveMoney.moneyCount)) {
          //Api przelewanie określonej ilości co miesiąć
          firebase
            .firestore()
            .collection("users")
            .doc(this.userData.userUid)
            .update({ saveAll: false, savings: thisVar.saveMoney.moneyCount })
            .then(function() {
              thisVar.saveMoney.errMsg = "";
              thisVar.saveMoney.goodMsg = "Zaktualizowano Dane";
            })
            .catch(function() {
              thisVar.saveMoney.errMsg = "Podaj liczbę";
              thisVar.saveMoney.goodMsg = "";
            });
        } else {
          this.saveMoney.errMsg = "Podaj liczbę";
          this.saveMoney.goodMsg = "";
        }
      } else {
        //Api reszta z miesiąca do oszczędności
        firebase
          .firestore()
          .collection("users")
          .doc(this.userData.userUid)
          .update({ saveAll: true, savings: 0 })
          .then(function() {
            thisVar.saveMoney.errMsg = "";
            thisVar.saveMoney.goodMsg = "Zaktualizowano Dane";
            console.log("mac miller");
          })
          .catch(function() {
            thisVar.saveMoney.errMsg = "Nie można zaktualizować danych";
            thisVar.saveMoney.goodMsg = "";
          });
      }
    },

    editCategory(e) {
      this.categoryEdit.catEdit = !this.categoryEdit.catEdit;
      console.log(e);
      if (e) this.categoryEdit.catProp = e;
      else this.categoryEdit.catProp = { id: "", name: "" };
    },
    addCategory() {
      this.categoryEdit.catAdd = !this.categoryEdit.catAdd;
    },
    deleteCategory(e) {
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("category")
        .doc(e.id)
        .delete()
        .then(function() {
          thisVar.getCategory();
        });
      console.log(e);
    },

    showInMoney(e) {
      this.inMoney.inState = !this.inMoney.inState;
      if (e) this.inMoney.inProp = e;
      else
        this.inMoney.inProp = {
          id: "",
          name: " ",
          allMoney: " ",
          nowMoney: " "
        };
      if (this.inMoney.inState == false) this.getGoal();
    },

    editGoal(e) {
      console.log("editGoal sie robi");
      this.goalEdit.goaEdit = !this.goalEdit.goaEdit;
      if (e) this.goalEdit.goalProp = e;
      else
        this.goalEdit.goalProp = {
          id: "",
          name: " ",
          allMoney: " ",
          nowMoney: " "
        };
      if (this.goalEdit.goaEdit == false) this.getGoal();
    },

    deleteGoal(e) {
      //Usuwanie celu
      var thisVar = this;
      firebase
        .firestore()
        .collection("users")
        .doc(this.userData.userUid)
        .collection("goal")
        .doc(e.id)
        .delete()
        .then(function() {
          thisVar.getGoal();
        });
      console.log(e);
    },

    editExpense(e) {
      this.expenseEdit.expenseEdit = !this.expenseEdit.expenseEdit;

      if (!this.expenseEdit.expenseEdit) this.getExpenses();
      if (e) this.expenseEdit.expenseProp = e;
      else this.expenseEdit.expenseProp = { id: " ", name: " " };
    },

    deleteExpense(e) {
      //Usuwanie wydatku
      var tmpD = new Date(e.date);
      var thisVar = this;
      firebase
        .firestore()
        .collection("users")
        .doc(this.userData.userUid)
        .collection("expenses")
        .doc(tmpD.getFullYear().toString())
        .collection((tmpD.getMonth() + 1).toString())
        .doc(e.id)
        .delete()
        .then(function() {
          thisVar.getExpenses();
        });
      console.log(e);
    }
  },
  components: {
    MediumBlock,
    InputBlock,
    ButtonComponent,
    ItemComponent,
    GoalManage,
    ExpenItem,
    EditCat,
    EditGoal,
    EditExpense,
    InMoney
  }
};
</script>

<style lang="scss" scoped>
.management {
  background: #e7e7e8;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "leftTop rightTop"
    "leftMiddle rightBottom"
    "leftBottom rightBottom";
  justify-items: center;
  align-items: center;
  &__budget {
    height: auto;
    &__button {
      margin: 20px 0;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
    &__errMsg {
      color: green;
      margin-top: 10px;
      height: 29px;
    }
  }
  &__expense {
    height: 400px;
    grid-area: rightBottom;
  }
  &__saveMoney {
    height: auto;
    &__wrapper {
      width: 100%;
      padding: 5px;
    }
    &__input {
      padding: 0;
    }
    &__button {
      margin: 20px 0;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
  }
  &__category {
    &__wrapper {
      width: 100%;
      flex: 1 1 auto;
      overflow-x: auto;
    }
    &__button {
      margin: 20px 0;
    }
  }
}
</style>