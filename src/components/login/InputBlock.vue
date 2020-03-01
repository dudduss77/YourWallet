<template>
  <div class="inputBlock">
    <label class="inputBlock__label">{{labelName}}</label>
    <input class="inputBlock__input" :type="inputType"/>
  </div>
</template>

<script>
export default {
  name: 'InputBlock',
  props: {
    labelName: String,
    inputType: String
  }
}
</script>

<style lang="scss" scoped>
  .inputBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 0 0;
    &__label {
      color: #555;
    }
    &__input {
      width: 240px;
      padding: 5px;
      border: none;
      border: 1px solid #888;
      margin-top: 10px;
      text-align: center;
      font-family: 'Roboto', sans-serif;
    }
  }
</style>