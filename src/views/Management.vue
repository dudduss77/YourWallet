<template>
  <div class="management">
    <medium-block class="management__budget" title="Miesięczny budżet">
      <h3 class="management__budget__errMsg">{{saveBudget.errMsg}}</h3>
      <input-block style="padding: 0" v-model="saveBudget.budget" labelName="Ustal miesięczny budżet" inputType="text" />
      <button-component :buttonFunc="this.budgetSave" class="management__budget__button" title="Zapisz" />
    </medium-block>

    <medium-block title="Edycja celi">

      <goal-manage v-for="item in goalEdit.goalList" :key="item.id" :title="item.name" :money="item.nowMoney" v-on:editGoal="editGoal(item)" v-on:delGoal="deleteGoal(item)"/>

    </medium-block>

    <medium-block class="management__saveMoney" title="Oszczędzanie">
      <h3 class="management__saveMoney__errMsg">{{saveMoney.errMsg}}</h3>
      <div class="management__saveMoney__wrapper">
        <input v-model="saveMoney.saveType" type="radio" name="saveMoney" id="one" value="one" checked />
        <label for="one">Odkładaje resztę z miesiąca</label>
      </div>
      <div class="management__saveMoney__wrapper">
        <input v-model="saveMoney.saveType" type="radio" name="saveMoney" id="two" value="two"/>
        <label for="two">Odkładaj co miesiąć pewną sume</label>
      </div>
      <input-block v-model="saveMoney.moneyCount" class="management__saveMoney__input" inputType="text" />
      <button-component :buttonFunc="this.moneySave" class="management__saveMoney__button" title="Zapisz" />
    </medium-block>

    <medium-block class="management__expense" title="Edycja wydatków">

      <expen-item v-for="item in expenseEdit.expenseList" :key="item.id" :date="item.date" :title="item.name" :price="item.price + ' PLN'" v-on:expenseEdit="editExpense(item)" v-on:expenseDel="deleteExpense(item)"/>

    </medium-block>

    <medium-block class="management__category" title="Kategorie">
      <div class="management__category__wrapper">

        <item-component v-for="item in categoryEdit.categoryList" :key="item.id" :category="item.name" v-on:catEdit="editCategory(item)" v-on:catDel="deleteCategory(item)"/>

      </div>

      <button-component :buttonFunc="this.addCategory" class="management__category__button" title="Dodaj" />
    </medium-block>

    <edit-cat :editValue="categoryEdit.catProp" v-if="categoryEdit.catEdit" v-on:catEdit="editCategory" name="Edytuj"/>
    <edit-cat :editValue="categoryEdit.catProp" v-if="categoryEdit.catAdd" v-on:catEdit="addCategory" name="Dodaj"/>

    <edit-goal :editValue="goalEdit.goalProp" v-if="goalEdit.goaEdit" v-on:editGoal="editGoal"/>

    <edit-expense :editValue="expenseEdit.expenseProp" v-if="expenseEdit.expenseEdit" v-on:expenseEdit="editExpense"/>

  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import InputBlock from "../components/reusable/InputBlock.vue";
import ButtonComponent from "../components/reusable/ButtonComponent.vue";
import ItemComponent from "../components/menagement/ItemComponent.vue";
import GoalManage from "../components/menagement/GoalManage.vue";
import ExpenItem from "../components/menagement/ExpenItem.vue";
import EditCat from '../components/menagement/EditCat.vue'
import EditGoal from '../components/menagement/EditGoal.vue'
import EditExpense from '../components/menagement/EditExpense.vue'


import db from '../db/db.json'
import goal from '../db/goal.json'
import expense from '../db/expense.json'


export default {
  name: "Management",
  data() {
    return {
      saveBudget: {
        budget: '',
        errMsg: ''
      },
      saveMoney: {
        saveType: 'one',
        moneyCount: '',
        errMsg: ''
      }, 
      categoryEdit: {
        categoryList: db,
        catEdit: false,
        catAdd: false,
        catProp: {},
      },
      
      goalEdit: {
        goalList: goal,
        goaEdit: false,
        goalProp: {}
      },

      expenseEdit: {
        expenseList: expense,
        expenseEdit: false,
        expenseProp: {}
      }
    }
  },
  methods: {
    budgetSave() {
      var numbers = /^[0-9]+$/;
      if((this.saveBudget.budget) && (this.saveBudget.budget.match(numbers))) {
        alert(this.saveBudget.budget);
        this.saveBudget.errMsg = ""
      } else {
        this.saveBudget.errMsg = "Podaj liczbę";
      }
    },
    moneySave() {
      var numbers = /^[0-9]+$/;
      if(this.saveMoney.saveType == 'two') {
        if((this.saveMoney.moneyCount) && (this.saveMoney.moneyCount.match(numbers))) {
          //Api
          this.saveMoney.errMsg = "";
        } else {
          this.saveMoney.errMsg = "Podaj liczbę";
        }
      } else {
        //Api
      }
    },

    editCategory(e) {
      this.categoryEdit.catEdit = !this.categoryEdit.catEdit;
      this.categoryEdit.catProp = e;
    },
    addCategory() {
      this.categoryEdit.catAdd = !this.categoryEdit.catAdd;
    },
    deleteCategory(e){
      //Usuwanie kategori
      console.log(e);
    },

    editGoal(e) {
      this.goalEdit.goaEdit = !this.goalEdit.goaEdit;
      this.goalEdit.goalProp = e;
    },

    deleteGoal(e) {
      //Usuwanie celu
      console.log(e);
    },

    editExpense(e) {
      this.expenseEdit.expenseEdit = !this.expenseEdit.expenseEdit;
      this.expenseEdit.expenseProp = e;
    },

    deleteExpense(e) {
      //Usuwanie wydatku
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
    EditExpense
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