<template>
  <div class="itemComponent">
    <div class="itemComponent__date">{{data}}</div>
    <div class="itemComponent__product">{{product}}</div>
    <div class="itemComponent__cat">{{category}}</div>
    <div class="itemComponent__price">{{price}}</div>
  </div>
</template>

<script>
export default {
  name: 'ItemComponent',
  props: {
    data: String,
    product: String,
    category: String,
    price: String
  }
}
</script>

<style lang="scss" scoped>
  .itemComponent {
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