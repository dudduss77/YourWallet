<template>
  <div class="details">
    <medium-block class="details__history" title="Historia wydatków">

      <details-form v-on:searchData="displayItems"/>

      <div class="details__history__items">
        <item-component data="Data" product="Produkt" category="Kategoria" price="Cena" />
        <item-component v-for="item in expenseList" :key="item.id"  :data="item.date" :product="item.name" :category="categoryList[item.category].name" :price="item.price" />
      </div>
    </medium-block>

    <div class="details__wrapper">
      <small-block title="W sumie zaoszczędzono" :moneyCount="moneyOne + 'PLN'" />
      <small-block title="W sumie wydano" :moneyCount="moneyTwo + 'PLN'" />
    </div>

    <medium-block class="details__chart" title="Wykres wydatków">Wykres</medium-block>

    <medium-block class="details__goal" title="Historia celi">
      <goal-block v-for="item in goalList" :key="item.id" :goal="item.name" :moneyOne="item.nowMoney" :moneyTwo="(item.allMoney - item.nowMoney).toString()"/>
    </medium-block>
  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import SmallBlock from "../components/reusable/SmallBlock.vue";
import GoalBlock from "../components/goals/GoalBlock.vue";
import ItemComponent from "../components/details/ItemComponent.vue";
import DetailsForm from "../components/details/DetailsForm.vue";
import goal from '../db/goal.json'
import expense from '../db/expense.json'
import db from '../db/db.json'

export default {
  name: "Details",
  data() {
    return {
      moneyOne: "3000", //Wyświetla ile w sumie zaoszczędzono wystarczy pobrać z bazy i powinno działać 
      moneyTwo: "35000", //Wyświetla ile w sumie wydano wystarczy pobrać z bazy i powinno działać
      searchSettings: {},
      goalList: goal, //Lista celów zamiast goal podpiąć json z bazy i będzie git
      expenseList: expense, //Lista wydatków tak samo jak wyżej tylko zalezna od parametrów searchSettings
      categoryList: db //Lista kategorii potrzebna do wyświetlenia odpowidnio kategorii w wydatkach chyba że inaczej to zaprogramujesz
    }
  },
  methods: {
    displayItems(e){
      this.searchSettings = e;
      //W searchSettings masz searchType: det lub cat uzależnia wyświetlanie czy szczegóły czy kategorie, fromDate, oraz toDate od daty do daty
    }
  },
  components: {
    MediumBlock,
    SmallBlock,
    GoalBlock,
    ItemComponent,
    DetailsForm
  }
};
</script>

<style lang="scss" scoped>
.details {
  background: #e7e7e8;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 1fr 1fr;
  grid-template-areas:
    "left rightTop"
    "left rightMiddle"
    "left rightBottom";
  &__history {
    align-self: center;
    justify-self: center;
    grid-area: left;
    height: 700px;
    width: 600px;
    margin: 20px 0;
    &__items {
      width: 100%;
      height: auto;
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
    }
  }
  &__wrapper {
    grid-area: rightTop;
    align-self: center;
    justify-self: center;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  &__chart {
    grid-area: rightMiddle;
    align-self: center;
    justify-self: center;
  }
  &__goal {
    grid-area: rightBottom;
    align-self: center;
    justify-self: center;
  }
}
</style>