<template>
  <div class="dashboard">
    <header-block class="dashboard__header" title="Twój pulpit"></header-block>
    <div class="dashboard__wrapper">
      <small-block title="Dostępne środki" :moneyCount="this.avaMoney" bottomText="Do końca miesiąca"/>
      <small-block title="Wydane" :moneyCount="this.issMoney" bottomText="Od początku miesiąca"/>
      <small-block title="Zaoszczędzone" :moneyCount="this.savMoney" bottomText="W poprzednim miesiącu"/>
    </div>
    <header-block class="dashboard__header" title="Statystyki"></header-block>
    <div class="dashboard__wrapper">
      <medium-block title="Poszczególne miesiące">
        <month-chart style="height: 200px" :chartData="chartDat"/>
      </medium-block>
      <medium-block title="Rozkład wydatków">
        <pie-chart style="height: 200px" :chartData="pieCharData"/>
      </medium-block>
      <medium-block title="Cele">
        <goal-block v-for="item in goalList" :key="item.id" :goal="item.name" :moneyOne="item.nowMoney" :moneyTwo="(item.allMoney - item.nowMoney).toString()"/>
      </medium-block>
    </div>
  </div>
</template>

<script>
import HeaderBlock from '../components/reusable/HeaderBlock.vue'
import SmallBlock from '../components/reusable/SmallBlock.vue'
import MediumBlock from '../components/reusable/MediumBlock.vue'
import GoalBlock from '../components/goals/GoalBlock.vue'

import MonthChart from '../components/charts/MonthChart.vue'
import PieChart from '../components/charts/PieChart.vue'

import firebase from 'firebase'

export default {
  name: "Dashboard",
  created() {


    var thisVar = this;
    thisVar.userData.userUid = firebase.auth().currentUser.uid;
    var db = firebase.firestore();

   
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

 //pobieranie kategorii
    this.getCategory();

    //pobieranie celi
    this.getGoal();

    //pobieranie wydatków
    this.getExpenses();
  },
  data() {
    return {
      avaMoney: "500", //Wyświetla dostępne pięniądze pobrać z bazy i pwoinno być git 
      issMoney: "1000.56", //Wyświetla wydane pienidze w danym miesiącu
      savMoney: "20.34", // Wyświetla zaoszczędzone pieniądze w danym miesiącu
      chartDat: [],
      pieCharData: {
        name: ['Jedz', 'Hobby', 'Stałe'],
        count: [0, 30 ,40],
      },
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
      },
      goalList: [], //Lista celi json z bazy danych
      categoryList: [],
      expenseList: [],
      expenseCat: []
    }
  },
  methods: {
        getExpenses() {

      var tmpD = new Date();
                  tmpD =
              tmpD.getFullYear() +
              "-" +
              (tmpD.getMonth() < 9
                ? "0" + (tmpD.getMonth() + 1)
                : tmpD.getMonth() + 1) +
              "-01";
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("expenses")
        .where("date", ">=", new Date(tmpD))
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          var time;
          var tmp;
          querySnapshot.forEach(function(doc) {
            console.log(doc.data().data);
            time = new Date(doc.data().date.seconds * 1000);
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

          thisVar.expenseList = tab;


            var catItem;
            for(var i in thisVar.categoryList) {
              catItem = thisVar.categoryList[i];

              var tabTmp = thisVar.expenseList.filter(function(item) {
                return (item.category == catItem.id);
              });

              thisVar.expenseCat[catItem.id] = {cost: "0", name: ""};

              thisVar.expenseCat[catItem.id].name = catItem.name;
              tabTmp.forEach(function(e) {
                  thisVar.expenseCat[catItem.id].cost = (parseFloat(thisVar.expenseCat[catItem.id].cost) + parseFloat(e.price)).toString();
            }); 
            

            }
        console.log("Wyswietlam obiekt kategorii");
        console.log(thisVar.pieCharData.name);
        console.log(thisVar.pieCharData.count);
          thisVar.pieCharData.name = [];
          thisVar.pieCharData.count = [];
        for(var j in thisVar.expenseCat) {
          thisVar.pieCharData.name.push(thisVar.expenseCat[j].name);
          thisVar.pieCharData.count.push(parseFloat(thisVar.expenseCat[j].cost));
        }
        console.log("Wyswietlam obiekt kategorii");
        console.log(thisVar.pieCharData.name);
        console.log(thisVar.pieCharData.count);
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
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("category")
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          querySnapshot.forEach(function(doc) {
            tab[doc.id] = { id: doc.id, name: doc.data().name };
            // thisVar.CatListNormal.push({
              // id: doc.id, name: doc.data().name 
            // })
          });

          thisVar.categoryList = tab;
        });
    },
  },
  components: {
    HeaderBlock,
    SmallBlock,
    MediumBlock,
    GoalBlock,
    MonthChart,
    PieChart
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    background: #E7E7E8;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__header {
      margin-top: 40px;
    }
    &__wrapper {
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>