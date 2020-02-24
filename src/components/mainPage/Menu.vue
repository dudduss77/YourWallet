<template>
  <div class="menu">
    <user-block imgSrc="userImg" userName="Damian Karbowiak"></user-block>
    <level-block></level-block>
    <div class="menu__nav">
      <link-block linkName="Pulpit" linkTo="/"></link-block>
      <link-block linkName="Szczegóły" linkTo="/szczegoly"></link-block>
      <link-block linkName="Tryb zarządzania" linkTo="/zarzadzanie"></link-block>
    </div>
    <sign-out-block></sign-out-block>
  </div>
</template>

<script>
import UserBlock from '../menu/UserBlock.vue'
import LevelBlock from '../menu/LevelBlock.vue'
import LinkBlock from '../menu/LinkBlock.vue'
import SignOutBlock from '../menu/SignOutBlock.vue'
export default {
  name: "Menu",
  components: {
    UserBlock,
    LevelBlock,
    LinkBlock,
    SignOutBlock
  }
}
</script>

<style lang="scss" scoped>
 .menu {
   width: 250px;
   background: #43516D;
   min-height: 100%;
   display: flex;
   flex-direction: column;
   &__nav {
     flex: 1 1 auto;
   }
 }
</style>