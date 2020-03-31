<template>
  <div class="itemComponent">
    <div class="itemComponent__header">{{category}}</div>
    <div @click="editClick" class="itemComponent__icon">
      <font-awesome-icon icon="edit" />
    </div>
    <div @click="delClick" class="itemComponent__icon">
      <font-awesome-icon icon="trash-alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemComponent",
  props: {
    category: String
  },
  methods: {
    editClick() {
      this.$emit("catEdit");
    },
    delClick() {
      this.$emit("catDel");
    }
  }
};
</script>

<style lang="scss" scoped>
.itemComponent {
  width: 100%;
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid #888;
  &__header {
    flex: 1 1 auto;
    margin-left: 5px;
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