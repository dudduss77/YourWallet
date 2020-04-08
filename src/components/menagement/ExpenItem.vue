<template>
  <div class="expenItem">
    <div class="expenItem__date">{{date}}</div>
    <div class="expenItem__header">{{title}}</div>
    <div class="expenItem__price">{{price}}</div>
    <div @click="editClick" class="expenItem__icon">
      <font-awesome-icon icon="edit" />
    </div>
    <div @click="delClick" class="expenItem__icon">
      <font-awesome-icon icon="trash-alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenItem",
  props: {
    date: String,
    title: String,
    price: String
  },
  methods: {
    editClick() {
      this.$emit('expenseEdit');
    },
    delClick() {
      this.$emit('expenseDel');
    }
  }
};
</script>

<style lang="scss" scoped>
.expenItem {
  display: flex;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #888;
  &__date {
    margin-left: 5px;
  }
  &__header {
    margin-left: 5px;
  }
  &__price {
    margin-left: 5px;
    flex: 1 1 auto;
  }
  &__icon {
    padding: 0 5px;
    font-size: 1.1em;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>