<template>
  <div class="detailsForm">
    <div class="detailsForm__wrapper">
      <div class="detailsForm__wrapper__form">
        <input
          v-model="searchSettings.searchType"
          class="detailsForm__wrapper__form__checkbox"
          type="radio"
          name="settings"
          value="det"
          checked
        />
        <label class="detailsForm__wrapper__form__label">Szczegóły</label>
      </div>
      <div class="detailsForm__wrapper__form">
        <input
          v-model="searchSettings.searchType"
          class="detailsForm__wrapper__form__checkbox"
          type="radio"
          name="settings"
          value="cat"
        />
        <label class="detailsForm__wrapper__form__label">Kategorie</label>
      </div>
      <div class="detailsForm__wrapper__form">
        <label class="detailsForm__wrapper__form__label">Od</label>
        <input
          v-model="searchSettings.fromDate"
          class="detailsForm__wrapper__form__input"
          type="date"
        />
      </div>
      <div class="detailsForm__wrapper__form">
        <label class="detailsForm__wrapper__form__label">Do</label>
        <input
          v-model="searchSettings.toDate"
          class="detailsForm__wrapper__form__input"
          type="date"
        />
      </div>
    </div>

    <button-component :buttonFunc="this.sendSearch" title="Pokaż" />
  </div>
</template>

<script>
import ButtonComponent from "../reusable/ButtonComponent.vue";
export default {
  name: "DetailsForm",
  created() {
    var tmpD = new Date();
    this.searchSettings.toDate =
      tmpD.getFullYear() +
      "-" +
      (tmpD.getMonth() > 8
        ? tmpD.getMonth() + 1
        : "0" + (tmpD.getMonth() + 1)) +
      "-" +
      tmpD.getDate();
    console.log("Wyswietlam searchSettings");
    console.log(this.searchSettings);
  },
  data() {
    return {
      searchSettings: {
        searchType: "det",
        fromDate: "2018-01-01",
        toDate: ""
      }
    };
  },
  methods: {
    sendSearch() {
      this.$emit("searchData", this.searchSettings);
      console.log("Wyswietla searchType");
      console.log(this.searchSettings);
    }
  },
  components: {
    ButtonComponent
  }
};
</script>

<style lang="scss" scoped>
.detailsForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 10px 0;
    &__form {
      &__label {
        color: #555;
      }
      &__input {
        width: 100px;
        padding: 5px;
        border: none;
        border: 1px solid #888;
        text-align: center;
        font-family: "Roboto", sans-serif;
        margin-left: 5px;
      }
    }
  }
}
</style>