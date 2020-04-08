<template>
  <div @click="singOut" class="signOutBlock">
    <font-awesome-icon icon="sign-out-alt" />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "SignOutBlock",
  methods: {
    singOut() {
      firebase
        .auth()
        .signOut()
        .then( () => {
          this.$router.replace('login');
        })
        .catch(function(error) {
          console.log(error)
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.signOutBlock {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  background: #3d4a64;
  cursor: pointer;
}
</style>