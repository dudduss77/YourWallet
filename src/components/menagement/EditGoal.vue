<template>
  <div class="editGoal">
    <div class="editGoal__form">
      <div class="editGoal__form__header">Edytuj</div>
      <h3 class="editGoal__form__errMsg">{{errMsg}}</h3>
      <input-block v-model="goalName" style="padding: 0" labelName="Nazwa celu" inputType="text" />
      <input-block v-model="goalMoney" labelName="Ile do uzbierania" inputType="text" />
      <button-component :buttonFunc="this.editGoal" class="editGoal__form__button" title="Zapisz" />
      <button-component
        :buttonFunc="this.cancelClick"
        style="margin-top: 0"
        class="editGoal__form__button"
        title="Anuluj"
      />
    </div>
  </div>
</template>

<script>
import ButtonComponent from "../reusable/ButtonComponent.vue";
import InputBlock from "../reusable/InputBlock.vue";
import firebase from "firebase";

export default {
  name: "EditGoal",
  props: {
    editValue: Object,
    uid: String
  },
  data() {
    return {
      goalName: this.editValue.name,
      goalMoney: this.editValue.allMoney,
      id: this.editValue.id,
      nowMoney: this.editValue.nowMoney,
      userId: this.uid,
      errMsg: ""
    };
  },
  methods: {
    cancelClick() {
      this.$emit("editGoal");
    },
    editGoal() {
      if (this.goalName && this.goalMoney && !isNaN(this.goalMoney)) {
        //Api edycja celu
        var thisVar = this;
        console.log("Edytuje cel sobie" + thisVar.userId);

        firebase
          .firestore()
          .collection("users")
          .doc(thisVar.userId)
          .collection("goal")
          .doc(thisVar.id)
          .update({ name: thisVar.goalName, allMoney: thisVar.goalMoney })
          .then(function() {
            console.log("Zedytowano " + thisVar.id);
            thisVar.errMsg = "";
            thisVar.$emit("editGoal");
          });
      } else {
        this.errMsg = "Wszystkie pola wymagane";
      }
    }
  },
  components: {
    ButtonComponent,
    InputBlock
  }
};
</script>

<style lang="scss" scoped>
.editGoal {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(100, 100, 100, 0.5);
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 300px;
    background: #f1f1f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px #555;
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      background: #3d4a64;
      font-size: 1.5em;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
    &__input {
      padding: 0;
    }
    &__button {
      margin: 20px 0;
    }
  }
}
</style>