<template>
  <div class="userSettings">
    <medium-block style="height: auto" title="Podstawowe dane">
      <div class="userSettings__userData">
        <div v-if="!this.userData.edit" class="userSettings__userData__wrapper">
          <span class="userSettings__userData__wrapper__header">Imie:</span> <span>{{this.userData.firstName}}</span>
        </div>
        <div v-if="!this.userData.edit" class="userSettings__userData__wrapper">
          <span class="userSettings__userData__wrapper__header">Nazwisko:</span> <span>{{this.userData.name}}</span>
        </div>
        
        <input-block v-if="this.userData.edit" v-model="userData.firstName" labelName="Imie" inputType="text"/>
        <input-block v-if="this.userData.edit" v-model="userData.name" labelName="Nazwisko" inputType="text"/>

        <button-component v-if="!this.userData.edit" :buttonFunc="this.editUser" class="userSettings__passChange__button" title="Edytuj"/>
        <button-component v-if="this.userData.edit" :buttonFunc="this.editUserData" class="userSettings__passChange__button" title="Zmień"/>
      </div>
    </medium-block>

    <medium-block style="height: auto" title="Zmiana hasła">
      <div class="userSettings__passChange">
        <h3 class="userSettings__passChange__errMsg">{{this.modPass.errMsg}}</h3>
        <input-block style="padding: 0" v-model="modPass.oldPass" labelName="Stare hasło" inputType="password"/>
        <input-block v-model="modPass.newPass" labelName="Nowe hasło" inputType="password"/>
        <input-block v-model="modPass.repPass" labelName="Powtórz hasło" inputType="password"/>
        <button-component :buttonFunc="this.changePass" class="userSettings__passChange__button" title="Zmień"/>
      </div>
    </medium-block>

    <medium-block style="height: auto" title="Zmiana adresu email">
      <div class="userSettings__mailChange">
        <h3 class="userSettings__passChange__errMsg">{{this.modEmail.errMsg}}</h3>
        <input-block style="padding: 0" v-model="modEmail.newEmail" labelName="Nowy adres email" inputType="text"/>
        <input-block v-model="modEmail.repEmail" labelName="Powtórz email" inputType="text"/>
        <button-component :buttonFunc="this.changeMail" class="userSettings__mailChange__button" title="Zmień"/>
      </div>
    </medium-block>

    <medium-block title="Usuń konto">
      <div class="userSettings__delAccount">
        <h3 class="userSettings__delAccount__header">Twoje konto zostanie usunięte</h3>
        <div class="userSettings__delAccount__wrapper">
          <input type="checkbox" value="Rozumiem usuń konto" v-model="delCheck"/>
          <label :class="{'userSettings__delAccount__wrapper--notChecked': redMod}">Rozumiem usuń konto</label>
        </div>
        <button-component :buttonFunc="this.delAccount" class="userSettings__delAccount__button" title="Zmień"/>
      </div>
    </medium-block>
  </div>
</template>

<script>
import MediumBlock from '../components/reusable/MediumBlock.vue'
import InputBlock from '../components/reusable/InputBlock.vue'
import ButtonComponent from '../components/reusable/ButtonComponent.vue'

export default {
  name: "UserSettings",
  components: {
    MediumBlock,
    InputBlock,
    ButtonComponent
  },
  data() {
    return {
      delCheck: false,
      redMod: false,
      modPass: {
        oldPass: "",
        newPass: "",
        repPass: "",
        errMsg: ""
      },
      modEmail: {
        newEmail: "",
        repEmail: "",
        errMsg: ""
      },
      userData: {
        firstName: "Damian",
        name: "Karbowiak",
        edit: false,
      }
    }
  },
  methods: {
    delAccount() {
      if(this.delCheck) {
        //Tutaj usuwanie użytkownika
      } else {
        this.redMod = true
      }
    },
    changePass() {
      if((this.modPass.oldPass) && (this.modPass.newPass) && (this.modPass.repPass)) {
        //Tutaj zmiana hasla api lub firebase
      } else {
        this.modPass.errMsg = "Wszystkie pola wymagane"
      }
    },
    changeMail() {
      if((this.modEmail.newEmail) && (this.modEmail.repEmail)) {
        //Tutaj zmiana mail api lub firebase
      } else {
        this.modEmail.errMsg = "Wszystkie pola wymagane"
      }
    },
    editUser() {
      this.userData.edit = !this.userData.edit
    },
    editUserData() {
      //Tutaj zmiana danych użytkownika api lub firebase
      this.userData.edit = !this.userData.edit
    }
  }
}

</script>

<style lang="scss" scoped>
  .userSettings {
    background: #E7E7E8;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-items: center;
    &__passChange, &__mailChange, &__delAccount, &__userData {
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