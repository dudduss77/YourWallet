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
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
export default {
  name: "GoalBlock",
  created() {
    this.percent =
      (parseFloat(this.moneyOne) / parseFloat(this.moneyTwo)) * 100;
  },
  props: {
    goal: String,
    moneyOne: String,
    moneyTwo: String
  },
  data() {
    return {
      percent: 70
    };
  },
  components: {}
};
</script>

<style lang="scss" >
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
  &__collected,
  &__missing {
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

@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

@keyframes progress-bar-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
.progress-bar {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  -webkit-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
.progress {
  display: -ms-flexbox;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}

.progress-bar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #007bff;
  transition: width 0.6s ease;
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    transition: none;
  }
}

.progress-bar-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-bar-animated {
  -webkit-animation: progress-bar-stripes 1s linear infinite;
  animation: progress-bar-stripes 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar-animated {
    -webkit-animation: none;
    animation: none;
  }
}
.bg-info {
  background-color: #17a2b8 !important;
}

a.bg-info:hover,
a.bg-info:focus,
button.bg-info:hover,
button.bg-info:focus {
  background-color: #117a8b !important;
}

.progress {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}
</style>