<template>
  <div @click="buttonClick" class="buttonComponent">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent', 
  props: {
    title: String,
    buttonFunc: {
      type: Function
      }
  },
  methods: {
    buttonClick() {
      this.buttonFunc()
    }
  },
}
</script>

<style lang="scss" scoped>
  .buttonComponent {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #43516D;
    color: #fff;
    font-size: 1.1em;
    &:hover {
      cursor: pointer;
    }
  }
</style>