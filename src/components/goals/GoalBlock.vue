<template>
  <div class="goalBlock">
    <div class="goalBlock__top">
      <h3 class="goalBlock__top__title">{{goal}}</h3>
      <div class="goalBlock__collected">
        <h3>Uzbierano</h3>
        <h3 class="goalBlock__collected__money">{{moneyOne}}</h3>
        <h3>PLN</h3>
      </div>
      <div class="goalBlock__missing">
        <h3>Brakuje</h3>
        <h3 class="goalBlock__missing__money">{{moneyTwo}}</h3>
        <h3>PLN</h3>
      </div>
    </div>
    <bar-component class="goalBlock__bar"/>
  </div>
</template>

<script>
import BarComponent from '../reusable/BarComponent.vue'
export default {
  name: "GoalBlock",
  props: {
    goal: String,
    moneyOne: String,
    moneyTwo: String
  },
  components: {
    BarComponent
  }
}
</script>

<style lang="scss" scoped>
  .goalBlock {
    width: calc(100% - 30px);
    height: 50px;
    padding: 15px;
    color: #888;
    &__top {
      display: flex;
      justify-content: space-between;
      &__title {
        color: #555;
      }
    }
    &__collected, &__missing {
      display: flex;
      &__money {
        margin-left: 5px;
      }
    }
    &__bar {
      margin-top: 10px;
      box-shadow: 0 0 3px #555;
    }
  }
</style>