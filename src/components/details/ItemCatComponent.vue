<template>
  <div class="itemCatComponent">
    <div class="itemCatComponent__cat">{{category}}</div>
    <div class="itemCatComponent__price">{{cost}}</div>
  </div>
</template>

<script>
export default {
  name: "ItemCatComponent",
  props: {
    category: String,
    cost: String
  }
};
</script>

<style lang="scss" scoped>
.itemCatComponent {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  padding: 5px 0;
  color: #555;
  border: 1px solid #888;
  &:nth-child(n + 2) {
    border-top: none;
    color: #888;
  }
}
</style>