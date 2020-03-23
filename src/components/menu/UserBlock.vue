<template>
  <div class="userBlock">
    <img class="userBlock__image" :src="buildLogoUrl(imgSrc)" alt="Zdjęcie użytkownika"/>
    <router-link class="userBlock__name" to="/userSettings">{{userName}}</router-link>
  </div>
</template>

<script>
export default {
  name: "UserBlock",
  props: {
    imgSrc: String,
    userName: String
  },
  methods: {
    buildLogoUrl(name) {
      if(name == ''){
        return '';
      }
      return require(`../../assets/${name}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
  .userBlock {
    margin-top: 25px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    &__image {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-left: 10px;
    }
    &__name {
      margin-left: 10px;
      font-size: 1.1em;
      color: #fff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>