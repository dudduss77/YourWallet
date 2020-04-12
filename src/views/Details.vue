<template>
  <div class="details">
    <medium-block class="details__history" title="Historia wydatków">
      <details-form v-on:searchData="displayItems" />

      <div class="details__history__items" v-if="searchSettings.searchType=='det'">
        <item-component data="Data" product="Produkt" category="Kategoria" price="Cena" />
        <item-component
          
          v-for="item in expenseList"
          :key="item.id"
          :data="item.date"
          :product="item.name"
          :category="categoryList[item.category].name"
          :price="item.price"
        />
      </div>

      <div class="details__history__items" v-if="searchSettings.searchType=='cat'">
        <item-component  data="Kategoria" product="Kwota" />
        <item-Cat-component
          
          v-for="item in CatListNormal"
          :key="item.id"
          :category="expenseCat[item.id].name"
          :cost="expenseCat[item.id].cost"
        />
      </div>
    </medium-block>

    <div class="details__wrapper">
      <small-block title="W sumie zaoszczędzono" :moneyCount="userData.allSavings + ' PLN'" />
      <small-block title="W sumie wydano" :moneyCount="userData.allExpenses + ' PLN'" />
    </div>

    <medium-block class="details__goal" title="Historia celi">
      <goal-block
        v-for="item in goalList"
        :key="item.id"
        :goal="item.name"
        :moneyOne="item.nowMoney"
        :moneyTwo="(item.allMoney - item.nowMoney).toString()"
      />
    </medium-block>
  </div>
</template>

<script>
import MediumBlock from "../components/reusable/MediumBlock.vue";
import SmallBlock from "../components/reusable/SmallBlock.vue";
import GoalBlock from "../components/goals/GoalBlock.vue";
import ItemComponent from "../components/details/ItemComponent.vue";
import ItemCatComponent from "../components/details/ItemCatComponent.vue";
import DetailsForm from "../components/details/DetailsForm.vue";

import firebase from "firebase";
export default {
  name: "Details",
  created() {
    var tmpD = new Date();
    this.searchSettings.toDate =
      tmpD.getFullYear() +
      "-" +
      (tmpD.getMonth() > 8
        ? tmpD.getMonth() + 1
        : "0" + (tmpD.getMonth() + 1)) +
      "-" +
      tmpD.getDate();

    var thisVar = this;
    thisVar.userData.userUid = firebase.auth().currentUser.uid;
    var db = firebase.firestore();

    //pobieranie kategorii
    this.getCategory();

    //pobieranie celi
    this.getGoal();

    //pobieranie wydatków
    this.getExpenses();
    //pobieranie danych usera
    db.collection("users")
      .doc(thisVar.userData.userUid)
      .onSnapshot(function(doc) {
        thisVar.userData.firstName = doc.data().name;
        thisVar.userData.name = doc.data().surname;
        thisVar.userData.budget = doc.data().budget;
        thisVar.userData.savings = doc.data().savings;
        thisVar.userData.saveAll = doc.data().saveAll;
        thisVar.userData.allSavings = doc.data().allSaving;
        thisVar.userData.allExpenses = doc.data().allExpenses;
        console.log(" dcsc" + thisVar.userData.allExpenses);
      });
  },
  data() {
    return {
      searchSettings: {
        searchType: "det",
        fromDate: "2018-01-01",
        toDate: ""
      },
      expenseCat: [],
      goalList: [], //Lista celów zamiast goal podpiąć json z bazy i będzie git
      expenseList: [], //Lista wydatków tak samo jak wyżej tylko zalezna od parametrów searchSettings
      categoryList: [], //Lista kategorii potrzebna do wyświetlenia odpowidnio kategorii w wydatkach chyba że inaczej to zaprogramujesz
      CatListNormal: [],
      userData: {
        firstName: "", //Pobranie danych z bazy
        name: "", //Pobranie danych z bazy
        edit: false,
        email: "",
        userUid: "",
        budget: "",
        savings: "",
        saveAll: true,
        allSavings: "",
        allExpenses: ""
      }
    };
  },
  methods: {
    getExpenses() {

      console.log("wywołuje getExpenses");
      console.log(this.categoryList);
      console.log(this.searchSettings);
      //var tmpD = new Date();
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("expenses")
        .where("date", ">=", new Date(this.searchSettings.fromDate))
        .where("date", "<=", new Date(this.searchSettings.toDate))
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          var time;
          var tmp;
          querySnapshot.forEach(function(doc) {
            console.log(doc.data().data);
            time = new Date(doc.data().date.seconds * 1000);
            console.log("Data 1: " + time);
            console.log(doc.data().name);
            tmp =
              time.getFullYear() +
              "-" +
              (time.getMonth() < 9
                ? "0" + (time.getMonth() + 1)
                : time.getMonth() + 1) +
              "-" +
              (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());

            tab.push({
              id: doc.id,
              name: doc.data().name,
              category: doc.data().category,
              date: tmp,
              price: doc.data().price
            });
          });
          console.log(tab);
          thisVar.expenseList = tab;

          console.log(thisVar.expenseList);

          if(thisVar.searchSettings.searchType == "cat") {
                            console.log("Wyswietlam katego");
                            console.log(thisVar.categoryList);
            var catItem;
            for(var i in thisVar.categoryList) {
              catItem = thisVar.categoryList[i];
              console.log("foreach działą");
              console.log(catItem);
              var tabTmp = thisVar.expenseList.filter(function(item) {
                return (item.category == catItem.id);
              });

              thisVar.expenseCat[catItem.id] = {cost: "0", name: ""};
              console.log("wyswietlam tabTmp");
              console.log(tabTmp);
              thisVar.expenseCat[catItem.id].name = catItem.name;
              tabTmp.forEach(function(e) {
                  thisVar.expenseCat[catItem.id].cost = (parseFloat(thisVar.expenseCat[catItem.id].cost) + parseFloat(e.price)).toString();
            }); 
            
            thisVar.searchSettings.searchType = "";
            thisVar.searchSettings.searchType = "cat";
            }
            (thisVar.categoryList).forEach(function(catItem) {
              // console.log("foreach działą");
              // var tabTmp = thisVar.expenseList.filter(function(item) {
              //   return (item.category == this.catItem.id);
              // });

              // thisVar.expenseCat[catItem.id] = 0;
              // console.log("wyswietlam tabTmp");
              // console.log(tabTmp);
              // tabTmp.forEach(function(e) {
              //     thisVar.expenseCat[catItem.id] += e.price;
              // });
              console.log(catItem);

            });


          console.log(thisVar.expenseCat);
          }
        });
    },
    getGoal() {
      console.log("wywołuje getGoal");
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("goal")
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          querySnapshot.forEach(function(doc) {
            tab.push({
              id: doc.id,
              name: doc.data().name,
              nowMoney: doc.data().nowMoney,
              allMoney: doc.data().allMoney
            });
          });

          thisVar.goalList = tab;
        });
    },
    getCategory() {
      console.log("wywołuje getCategory");
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("category")
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          querySnapshot.forEach(function(doc) {
            tab[doc.id] = { id: doc.id, name: doc.data().name };
            thisVar.CatListNormal.push({
              id: doc.id, name: doc.data().name 
            })
          });

          thisVar.categoryList = tab;
          console.log("Wyswietlam cele");
          console.log(thisVar.categoryList);
        });
    },
    displayItems(e) {
      this.searchSettings = e;
      this.getExpenses();
      //W searchSettings masz searchType: det lub cat uzależnia wyświetlanie czy szczegóły czy kategorie, fromDate, oraz toDate od daty do daty
    }
  },
  components: {
    MediumBlock,
    SmallBlock,
    GoalBlock,
    ItemComponent,
    DetailsForm,
    ItemCatComponent,
    
  }
};
</script>

<style lang="scss" scoped>
.details {
  background: #e7e7e8;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 1fr;
  grid-template-areas:
    "left rightTop"
    "left rightMiddle";
  &__history {
    align-self: center;
    justify-self: center;
    grid-area: left;
    height: 700px;
    width: 600px;
    margin: 20px 0;
    &__items {
      width: 100%;
      height: auto;
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0;
    }
  }
  &__wrapper {
    grid-area: rightTop;
    align-self: center;
    justify-self: center;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  &__goal {
    grid-area: rightMiddle;
    align-self: center;
    justify-self: center;
    height: 400px;
  }
}
</style>