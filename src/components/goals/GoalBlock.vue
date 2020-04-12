<template>
  <div class="goalBlock">
    <div class="goalBlock__top">
      <h6 class="goalBlock__top__title">{{goal}}</h6>
      <div class="goalBlock__collected">
        <h6>Uzbierano</h6>
        <h6 class="goalBlock__collected__money">{{moneyOne}}</h6>
        <h6>PLN</h6>
      </div>
      <div class="goalBlock__missing">
        <h6>Brakuje</h6>
        <h6 class="goalBlock__missing__money">{{moneyTwo}}</h6>
        <h6>PLN</h6>
      </div>
    </div>
    <b-progress :value="percent" variant="info" :striped="false" class="bar"></b-progress>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "GoalBlock",
  created() {
    this.percent =  parseFloat(this.moneyOne)/parseFloat(this.moneyTwo)*100;

  },
  props: {
    goal: String,
    moneyOne: String,
    moneyTwo: String,
  },
  data() {
    return {
      percent: 70
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
  .goalBlock {
    width: calc(100% - 30px);
    height: 100px;
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