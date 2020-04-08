<template>
  <div class="goalManage">
    <div class="goalManage__header">{{title}}</div>
    <div class="goalManage__content">Uzbierano {{money}} PLN</div>
    <div @click="editGoal" class="goalManage__icon">
      <font-awesome-icon icon="edit" />
    </div>
    <div @click="delGoal" class="goalManage__icon">
      <font-awesome-icon icon="trash-alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "GoalManage",
  props: {
    title: String,
    money: String
  },
  methods: {
    editGoal() {
      this.$emit('editGoal');
    },
    delGoal() {
      this.$emit('delGoal');
    }
  }
};
</script>

<style lang="scss" scoped>
.goalManage {
  display: flex;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #888;
  &__header {
    margin-left: 5px;
  }
  &__content {
    margin-left: 10px;
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