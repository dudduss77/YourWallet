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
        Wykres
      </medium-block>
      <medium-block title="Rozkład wydatków">
        Wykres
      </medium-block>
      <medium-block title="Cele">
        <goal-block goal="Wakacje" moneyOne="1000" moneyTwo="2000"/>
        <goal-block goal="Remont" moneyOne="500" moneyTwo="5000"/>
      </medium-block>
    </div>
  </div>
</template>

<script>
import HeaderBlock from '../components/reusable/HeaderBlock.vue'
import SmallBlock from '../components/reusable/SmallBlock.vue'
import MediumBlock from '../components/reusable/MediumBlock.vue'
import GoalBlock from '../components/goals/GoalBlock.vue'

export default {
  name: "Dashboard",
  data() {
    return {
      avaMoney: "500",
      issMoney: "1000.56",
      savMoney: "20.34"
    }
  },
  components: {
    HeaderBlock,
    SmallBlock,
    MediumBlock,
    GoalBlock
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