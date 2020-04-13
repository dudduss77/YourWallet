<template>
  <div class="dashboard">
    <header-block class="dashboard__header" title="Twój pulpit"></header-block>
    <div class="dashboard__wrapper">
      <small-block
        title="Dostępne środki"
        :moneyCount="this.avaMoney"
        bottomText="Do końca miesiąca"
      />
      <small-block title="Wydane" :moneyCount="this.issMoney" bottomText="Od początku miesiąca" />
      <small-block
        title="Zaoszczędzone"
        :moneyCount="this.userData.savings"
        bottomText="W poprzednim miesiącu"
      />
    </div>
    <header-block class="dashboard__header" title="Statystyki"></header-block>
    <div class="dashboard__wrapper">
      <medium-block title="Poszczególne miesiące">
        <month-chart v-if="chartDatVisible" style="height: 200px" :chartData="chartDat" />
      </medium-block>
      <medium-block title="Rozkład wydatków">
        <pie-chart v-if="pieCharData.visible" style="height: 200px" :chartData="pieCharData" />
      </medium-block>
      <medium-block title="Cele">
        <goal-block
          v-for="item in goalList"
          :key="item.id"
          :goal="item.name"
          :moneyOne="item.nowMoney"
          :moneyTwo="(item.allMoney - item.nowMoney).toString()"
        />
      </medium-block>
    </div>
  </div>
</template>

<script>
import HeaderBlock from "../components/reusable/HeaderBlock.vue";
import SmallBlock from "../components/reusable/SmallBlock.vue";
import MediumBlock from "../components/reusable/MediumBlock.vue";
import GoalBlock from "../components/goals/GoalBlock.vue";

import MonthChart from "../components/charts/MonthChart.vue";
import PieChart from "../components/charts/PieChart.vue";

import firebase from "firebase";

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
        thisVar.userData.budget = parseFloat(doc.data().budget);
        thisVar.userData.savings = doc.data().LastMonthSavings;
        thisVar.userData.saveAll = doc.data().saveAll;
        thisVar.userData.allSavings = doc.data().allSaving;
        thisVar.userData.allExpenses = doc.data().allExpenses;
      });

    //pobieranie kategorii
    this.getCategory();

    //pobieranie celi
    this.getGoal();

    //pobieranie wydatków
    this.getExpenses();

    //ustawiam avaMoney
  },
  mounted() {},
  data() {
    return {
      avaMoney: "0", //Wyświetla dostępne pięniądze pobrać z bazy i pwoinno być git
      issMoney: "0", //Wyświetla wydane pienidze w danym miesiącu
      // savMoney: "20.34", // Wyświetla zaoszczędzone pieniądze w danym miesiącu
      chartDat: [],
      chartDatVisible: false,
      pieCharData: {
        name: ["Jedz", "Hobby", "Stałe", "krowy"],
        count: [10, 30, 40, 50],
        visible: false
      },
      userData: {
        firstName: "", //Pobranie danych z bazy
        name: "", //Pobranie danych z bazy
        edit: false,
        email: "",
        userUid: "",
        budget: 0,
        savings: "",
        saveAll: true,
        allSavings: "",
        allExpenses: ""
      },
      goalList: [], //Lista celi json z bazy danych
      categoryList: [],
      expenseList: [],
      expenseCat: []
    };
  },
  methods: {
    getExpenses() {
      var tmpD = new Date();
      var tmpDFull =
        tmpD.getFullYear() +
        "-" +
        (tmpD.getMonth() < 9
          ? "0" + (tmpD.getMonth() + 1)
          : tmpD.getMonth() + 1) +
        "-01";

      tmpD = tmpD.getFullYear() + "-01-01";
      var db = firebase.firestore();
      var thisVar = this;
      db.collection("users")
        .doc(thisVar.userData.userUid)
        .collection("expenses")
        .where("date", ">=", new Date(tmpD))
        .orderBy("date", "desc")
        .onSnapshot(function(querySnapshot) {
          const tab = [];
          var time;
          var tmp;
          querySnapshot.forEach(function(doc) {
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

          thisVar.expenseList = tab.filter(function(e) {
            return new Date(e.date) >= new Date(tmpDFull);
          });

          //pobieranie danych do pieCHart
          var catItem;
          for (var i in thisVar.categoryList) {
            catItem = thisVar.categoryList[i];

            var tabTmp = thisVar.expenseList.filter(function(item) {
              return item.category == catItem.id;
            });

            thisVar.expenseCat[catItem.id] = { cost: "0", name: "" };

            thisVar.expenseCat[catItem.id].name = catItem.name;
            tabTmp.forEach(function(e) {
              thisVar.expenseCat[catItem.id].cost = (
                parseFloat(thisVar.expenseCat[catItem.id].cost) +
                parseFloat(e.price)
              ).toString();
            });
          }

          thisVar.pieCharData.name = [];
          thisVar.pieCharData.count = [];
          for (var j in thisVar.expenseCat) {
            thisVar.pieCharData.name.push(thisVar.expenseCat[j].name);
            thisVar.pieCharData.count.push(
              parseFloat(thisVar.expenseCat[j].cost)
            );
          }

          thisVar.pieCharData.visible = true;

          // przygotowanie danych do wykresu słupkowego
          for (i = 1; i < new Date().getMonth() + 2; i++) {
            var sum = 0;
            let tymczas;
            let dfrom = new Date().getFullYear() + "-0" + i + "-01";
            let dto = new Date().getFullYear() + "-0" + (i + 1) + "-01";
            tymczas = tab.filter(function(e) {
              return e.date >= dfrom && e.date < dto;
            });

            tymczas.forEach(function(e) {
              sum += parseFloat(e.price);
            });
            thisVar.chartDat.push(sum);
          }
          thisVar.issMoney = sum.toString();

          thisVar.chartDatVisible = true;

          console.log(thisVar.userData.budget + " " + thisVar.issMoney);
          thisVar.avaMoney = (
            thisVar.userData.budget - thisVar.issMoney
          ).toString();
        });
    },
    getGoal() {
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
    }
  },
  components: {
    HeaderBlock,
    SmallBlock,
    MediumBlock,
    GoalBlock,
    MonthChart,
    PieChart
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  background: #e7e7e8;
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