<template>
  <div class="dashboard">
    <header-block class="dashboard__header" title="Twój pulpit"></header-block>
    <div class="dashboard__wrapper">
      <small-block title="Dostępne środki" moneyCount="700" bottomText="Do końca miesiąca 31 dni"/>
      <small-block title="Wydane" moneyCount="459.59" bottomText="Od początku miesiąca"/>
      <small-block title="Zaoszczędzone" moneyCount="1000.49" bottomText="W poprzednim miesiącu"/>
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
        <goal-block/>
        <goal-block/>
        <goal-block/>
        <goal-block/>
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
      margin-top: 60px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>