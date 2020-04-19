<template>
  <div class="editCat">
    <div class="editCat__form">
      <div class="editCat__form__header">{{name}}</div>
      <h3 class="editCat__form__errMsg">{{errMsg}}</h3>
      <input-block
        v-model="catName"
        class="editCat__form__input"
        labelName="Nazwa Kategorii"
        inputType="text"
      />
      <button-component
        :buttonFunc="this.editCategory"
        class="editCat__form__button"
        title="Zapisz"
      />
      <button-component
        style="margin-top: 0"
        :buttonFunc="this.cancelClick"
        class="editCat__form__button"
        title="Anuluj"
      />
    </div>
  </div>
</template>

<script>
import InputBlock from "../reusable/InputBlock.vue";
import ButtonComponent from "../reusable/ButtonComponent.vue";
import firebase from "firebase";

export default {
  name: "EditCat",
  props: {
    name: String,
    editValue: Object,
    uid: String,
    add: Boolean
  },
  data() {
    return {
      catName: this.editValue.name,
      catId: this.editValue.id,
      errMsg: ""
    };
  },
  methods: {
    cancelClick() {
      this.$emit("catEdit");
    },
    editCategory() {
      var thisVar = this;

      var db = firebase.firestore();
      if (!this.add) {
        if (this.catName) {
          db.collection("users")
            .doc(thisVar.uid)
            .collection("category")
            .doc(thisVar.catId)
            .update({ name: thisVar.catName })
            .then(function() {
              thisVar.$emit("catUpdate");
              thisVar.$emit("catEdit");
              thisVar.errMsg = "";
            })
            .catch(function() {
              thisVar.errMsg = "Błąd";
            });

          this.errMsg = "";
        } else {
          this.errMsg = "Uzupełni kategorie";
        }
      } else {
        if (this.catName) {
          db.collection("users")
            .doc(thisVar.uid)
            .collection("category")
            .add({ name: thisVar.catName })
            .then(function() {
              thisVar.$emit("catUpdate");
              thisVar.$emit("catEdit");
              thisVar.errMsg = "";
            })
            .catch(function() {
              thisVar.errMsg = "Błąd";
            });

          this.errMsg = "";
        } else {
          this.errMsg = "Uzupełni kategorie";
        }
      }
    }
  },
  components: {
    InputBlock,
    ButtonComponent
  }
};
</script>

<style lang="scss" scoped>
.editCat {
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