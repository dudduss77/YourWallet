<template>
  <div class="dashboard">
    <header-block class="dashboard__header" title="Twój pulpit"></header-block>
    <div class="dashboard__wrapper">
      <small-block title="Dostępne środki" :moneyCount="this.avaMoney" bottomText="Do końca miesiąca"/>
      <small-block title="Wydane" :moneyCount="this.issMoney" bottomText="Od początku miesiąca"/>
      <small-block title="Zaoszczędzone" :moneyCount="this.savMoney" bottomText="W poprzednim miesiącu"/>
    </div>
    <header-block class="dashboard__header" title="Statystyki"></header-block>
    <div class="dashboard__wrapper">
      <medium-block title="Poszczególne miesiące">
        <month-chart style="height: 200px" :chartData="chartDat"/>
      </medium-block>
      <medium-block title="Rozkład wydatków">
        <pie-chart style="height: 200px" :chartData="pieCharData"/>
      </medium-block>
      <medium-block title="Cele">
        <goal-block v-for="item in goalList" :key="item.id" :goal="item.name" :moneyOne="item.nowMoney" :moneyTwo="(item.allMoney - item.nowMoney).toString()"/>
      </medium-block>
    </div>
  </div>
</template>

<script>
import HeaderBlock from '../components/reusable/HeaderBlock.vue'
import SmallBlock from '../components/reusable/SmallBlock.vue'
import MediumBlock from '../components/reusable/MediumBlock.vue'
import GoalBlock from '../components/goals/GoalBlock.vue'

import MonthChart from '../components/charts/MonthChart.vue'
import PieChart from '../components/charts/PieChart.vue'

import goal from '../db/goal.json'

export default {
  name: "Dashboard",
  data() {
    return {
      avaMoney: "500", //Wyświetla dostępne pięniądze pobrać z bazy i pwoinno być git 
      issMoney: "1000.56", //Wyświetla wydane pienidze w danym miesiącu
      savMoney: "20.34", // Wyświetla zaoszczędzone pieniądze w danym miesiącu
      chartDat: [300, 400, 1000, 500],
      pieCharData: {
        name: ['Jedznie', 'Hobby', 'Stałe'],
        count: [20, 30 ,40],
      },
      goalList: goal //Lista celi json z bazy danych
    }
  },
  components: {
    HeaderBlock,
    SmallBlock,
    MediumBlock,
    GoalBlock,
    MonthChart,
    PieChart
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    background: #E7E7E8;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__header {
      margin-top: 40px;
    }
    &__wrapper {
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>