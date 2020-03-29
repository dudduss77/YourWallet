<template>
  <div class="details">
    <medium-block class="details__history" title="Historia wydatków">

      <details-form v-on:searchData="displayItems"/>

      <div class="details__history__items">
        <item-component data="Data" product="Produkt" category="Kategoria" price="Cena" />
        <item-component data="17.03.2020" product="Mleko" category="Jedzenie" price="2.49" />
        <item-component data="17.03.2020" product="Mleko" category="Jedzenie" price="2.49" />
        <item-component data="17.03.2020" product="Mleko" category="Jedzenie" price="2.49" />
      </div>
    </medium-block>

    <div class="details__wrapper">
      <small-block title="W sumie zaoszczędzono" moneyCount="2000 PLN" />
      <small-block title="W sumie wydano" moneyCount="30000 PLN" />
    </div>

    <medium-block class="details__chart" title="Wykres wydatków">Wykres</medium-block>

    <medium-block class="details__goal" title="Historia celi">
      <goal-block goal="Wakacje" moneyOne="1000" moneyTwo="2000" />
      <goal-block goal="Remont" moneyOne="500" moneyTwo="5000" />
    </medium-block>
  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import SmallBlock from "../components/reusable/SmallBlock.vue";
import GoalBlock from "../components/goals/GoalBlock.vue";
import ItemComponent from "../components/details/ItemComponent.vue";
import DetailsForm from "../components/details/DetailsForm.vue";
export default {
  name: "Details",
  data() {
    return {
      moneyOne: "2000",
      moneyTwo: "30000",
      searchSettings: {},
    }
  },
  methods: {
    displayItems(e){
      this.searchSettings = e;
      //api
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