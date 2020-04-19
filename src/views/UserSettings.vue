<template>
  <div class="userSettings">
    <medium-block style="height: auto" title="Podstawowe dane">
      <div class="userSettings__userData">
        <h3 class="userSettings__passChange__errMsg">{{this.modUser.errMsg}}</h3>
        <div v-if="!this.userData.edit" class="userSettings__userData__wrapper">
          <span class="userSettings__userData__wrapper__header">Imie:</span>
          <span>{{this.userData.firstName}}</span>
        </div>
        <div v-if="!this.userData.edit" class="userSettings__userData__wrapper">
          <span class="userSettings__userData__wrapper__header">Nazwisko:</span>
          <span>{{this.userData.name}}</span>
        </div>

        <input-block
          v-if="this.userData.edit"
          v-model="modUser.newName"
          labelName="Imie"
          inputType="text"
        />
        <input-block
          v-if="this.userData.edit"
          v-model="modUser.newSurname"
          labelName="Nazwisko"
          inputType="text"
        />

        <button-component
          v-if="!this.userData.edit"
          :buttonFunc="this.editUser"
          class="userSettings__passChange__button"
          title="Edytuj"
        />
        <button-component
          v-if="this.userData.edit"
          :buttonFunc="this.editUserData"
          class="userSettings__passChange__button"
          title="Zmień"
        />
        <button-component
          v-if="this.userData.edit"
          :buttonFunc="this.editUser"
          class="userSettings__passChange__button"
          title="Anuluj"
        />
      </div>
    </medium-block>

    <medium-block style="height: auto" title="Zmiana hasła">
      <div class="userSettings__passChange">
        <h3 class="userSettings__passChange__errMsg">{{this.modPass.errMsg}}</h3>
        <h3 class="userSettings__passChange__goodMsg">{{this.modPass.goodMsg}}</h3>
        <input-block
          style="padding: 0"
          v-model="modPass.oldPass"
          labelName="Stare hasło"
          inputType="password"
        />
        <input-block v-model="modPass.newPass" labelName="Nowe hasło" inputType="password" />
        <input-block v-model="modPass.repPass" labelName="Powtórz hasło" inputType="password" />
        <button-component
          :buttonFunc="this.changePass"
          class="userSettings__passChange__button"
          title="Zmień"
        />
      </div>
    </medium-block>

    <medium-block style="height: auto" title="Zmiana adresu email">
      <div class="userSettings__mailChange">
        <h3 class="userSettings__passChange__errMsg">{{this.modEmail.errMsg}}</h3>
        <h3 class="userSettings__passChange__goodMsg">{{this.modEmail.goodMsg}}</h3>
        <input-block
          style="padding: 0"
          v-model="modEmail.newEmail"
          labelName="Nowy adres email"
          inputType="text"
        />
        <input-block v-model="modEmail.repEmail" labelName="Powtórz email" inputType="text" />
        <button-component
          :buttonFunc="this.changeMail"
          class="userSettings__mailChange__button"
          title="Zmień"
        />
      </div>
    </medium-block>

    <medium-block title="Usuń konto">
      <div class="userSettings__delAccount">
        <h3 class="userSettings__delAccount__header">Twoje konto zostanie usunięte</h3>
        <div class="userSettings__delAccount__wrapper">
          <input type="checkbox" value="Rozumiem usuń konto" v-model="delCheck" />
          <label
            :class="{'userSettings__delAccount__wrapper--notChecked': redMod}"
          >Rozumiem usuń konto</label>
        </div>
        <button-component
          :buttonFunc="this.delAccount"
          class="userSettings__delAccount__button"
          title="Zmień"
        />
      </div>
    </medium-block>
  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import InputBlock from "../components/reusable/InputBlock.vue";
import ButtonComponent from "../components/reusable/ButtonComponent.vue";
import firebase from "firebase";
import router from "./../router";

export default {
  name: "UserSettings",
  components: {
    MediumBlock,
    InputBlock,
    ButtonComponent
  },
  data() {
    return {
      user: firebase.auth().currentUser,
      delCheck: false,
      redMod: false,
      modPass: {
        oldPass: "",
        newPass: "",
        repPass: "",
        errMsg: "",
        goodMsg: ""
      },
      modEmail: {
        newEmail: "",
        repEmail: "",
        errMsg: "",
        goodMsg: ""
      },
      modUser: {
        newName: "",
        newSurname: "",
        errMsg: ""
      },
      userData: {
        firstName: "", //Pobranie danych z bazy
        name: "", //Pobranie danych z bazy
        edit: false,
        email: "",
        userUid: ""
      }
    };
  },
  created() {
    var thisVar = this;
    thisVar.userData.userUid = firebase.auth().currentUser.uid;
    thisVar.userData.email = firebase.auth().currentUser.email;

    var db = firebase.firestore();
    db.collection("users")
      .doc(thisVar.userData.userUid)
      .get()
      .then(function(doc) {
        thisVar.userData.firstName = doc.data().name;
        thisVar.modUser.newName = doc.data().name;

        thisVar.userData.name = doc.data().surname;
        thisVar.modUser.newSurname = doc.data().surname;
      })
      .catch(function() {});
  },
  methods: {
    delAccount() {
      var r = router;
      let tmpUid = this.userData.userUid;
      if (this.delCheck) {
        firebase
          .auth()
          .currentUser.delete()
          .then(function() {
            firebase
              .firestore()
              .collection("users")
              .doc(tmpUid)
              .delete();

            r.push("login");
          });
      } else {
        this.redMod = true;
      }
    },
    changePass() {
      if (
        this.modPass.oldPass &&
        this.modPass.newPass &&
        this.modPass.repPass &&
        this.modPass.repPass == this.modPass.newPass
      ) {
        //Tutaj zmiana hasla api lub firebase
        var thisVar = this;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.userData.email, this.modPass.oldPass)
          .then(function() {
            thisVar.user
              .updatePassword(thisVar.modPass.newPass)
              .then(function() {
                thisVar.modPass.errMsg = "";
                thisVar.modPass.goodMsg = "Hasło zostało zmienione";
              })
              .catch(function() {
                thisVar.modPass.goodMsg = "";
                thisVar.modPass.errMsg = "Błąd, spróbuj ponownie";
              });
          })
          .catch(function() {
            thisVar.modPass.goodMsg = "";
            thisVar.modPass.errMsg = "Aktualne hasło jest nieprawidłowe";
          });
      } else {
        thisVar.modPass.goodMsg = "";
        thisVar.modPass.errMsg = "Wypełnij poprawnie formularz";
      }
    },
    changeMail() {
      if (
        this.modEmail.newEmail &&
        this.modEmail.repEmail &&
        this.modEmail.newEmail == this.modEmail.repEmail
      ) {
        //Tutaj zmiana mail api lub firebase
        var thisVar = this;

        this.user
          .updateEmail(this.modEmail.newEmail)
          .then(function() {
            thisVar.modEmail.goodMsg = "Email został zmieniony";
            thisVar.modEmail.errMsg = "";
          })
          .catch(function() {
            thisVar.modEmail.errMsg = "Nieprawidłowy email";
            thisVar.modEmail.goodMsg = "";
          });
      } else {
        this.modEmail.errMsg = "Pola muszą być identyczne!";
        this.modEmail.goodMsg = "";
      }
    },
    editUser() {
      this.modUser.errMsg = "";
      this.userData.edit = !this.userData.edit;
    },
    editUserData() {
      if (this.modUser.newName && this.modUser.newSurname) {
        var thisVar = this;
        firebase
          .firestore()
          .collection("users")
          .doc(thisVar.userData.userUid)
          .update({
            name: thisVar.modUser.newName,
            surname: thisVar.modUser.newSurname
          })
          .then(function() {
            thisVar.userData.firstName = thisVar.modUser.newName;
            thisVar.userData.name = thisVar.modUser.newSurname;
            thisVar.userData.edit = !thisVar.userData.edit;
          });
      } else {
        this.modUser.errMsg = "Żadne Pole nie może być puste";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.userSettings {
  background: #e7e7e8;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
  &__passChange,
  &__mailChange,
  &__delAccount,
  &__userData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__button {
      margin: 20px 0;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
    &__errMsg {
      color: #ff0000;
      margin-top: 10px;
      height: 29px;
    }
  }
  &__delAccount {
    &__header {
      margin: 10px 0;
    }
    &__wrapper {
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      &--notChecked {
        color: #ff0000;
      }
    }
    &__button {
      margin: 20px 0;
    }
  }
  &__userData {
    &__wrapper {
      width: 95%;
      padding: 5px 0;
      &__header {
        color: #555;
      }
    }
  }
}
</style>