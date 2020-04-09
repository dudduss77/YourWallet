<template>
  <div class="menu">
    <user-block imgSrc="userImg" :userName="userName"></user-block>
    <div class="menu__nav">
      <link-block linkName="Pulpit" linkTo="/dashboard"></link-block>
      <link-block linkName="Szczegóły" linkTo="/details"></link-block>
      <link-block linkName="Tryb zarządzania" linkTo="/management"></link-block>
    </div>
    <sign-out-block></sign-out-block>
  </div>
</template>

<script>
import UserBlock from '../menu/UserBlock.vue'
import LinkBlock from '../menu/LinkBlock.vue'
import SignOutBlock from '../menu/SignOutBlock.vue'

import firebase from 'firebase'

export default {
  name: "Menu",
  components: {
    UserBlock,
    LinkBlock,
    SignOutBlock
  },
  date() {
    return {
      userName: ''
    }
  },
  created: function () {
    var user = firebase.auth().currentUser;
    var vm = this;
    if(user != null) {
      vm.userName = user.displayName;
    }
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
     margin-top: 10px;
   }
 }
</style>