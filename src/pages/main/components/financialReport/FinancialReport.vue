<template>
  <div class="common-container">
    <div class="container-financial">

      <fieldset class="block-item">
        <legend class="bold-legend-financial">Финансовый прогноз</legend>
        <div class="financial-prop">
          <p>Годовой пробег всех автомобилей :  <span class="bold-prop">{{report.totalKilometrage}} км.</span></p>
          <p>Общее количество ТО-1 : <span class="bold-prop">{{report.totalNumOfTo1}} ед.</span> </p>
          <p>Общее количество ТО-2 :  <span class="bold-prop">{{report.totalNumOfTo2}} ед.</span></p>
          <p>Общее количество КР :  <span class="bold-prop">{{report.totalNumOfKr}} ед.</span></p>
          <p>Стоимость проведения ТО-1 :  <span class="bold-prop">{{report.totalCostTo1}} руб.</span></p>
          <p>Стоимость проведения ТО-2 :  <span class="bold-prop">{{report.totalCostTo2}} руб.</span></p>
          <p>Стоимость проведения КР :  <span class="bold-prop">{{report.totalCostKr}} руб.</span></p>
          <p>Итого годовые затраты на ТО и КР :  <span class="bold-prop">{{report.totalCosts}} руб.</span></p>
        </div>

      </fieldset>
      <fieldset class="block-item block-item-data">
        <legend class="bold-legend-financial">Данные для отчета</legend>
        <div class="financial-prop">
          <p class="financial-prop-data">Количество рабочих дней в году</p>
          <select class="select-financial" name="" id="" v-model="reportData.numWorkingDays">
            <option :value=NumWorkingDays.SEVEN.value>{{NumWorkingDays.SEVEN.value}}</option>
            <option :value=NumWorkingDays.SIX.value>{{ NumWorkingDays.SIX.value }}</option>
            <option :value=NumWorkingDays.FIFE.value>{{ NumWorkingDays.FIFE.value }}</option>
          </select>
          <!--        <input class="financial-inp" v-model="reportData.numWorkingDays">-->
          <p class="financial-prop-data">Стоимость ТО-1, руб.</p>
          <input class="financial-inp" v-model="reportData.to1Cost">
          <p class="financial-prop-data">Стоимость ТО-2, руб.</p>
          <input class="financial-inp" v-model="reportData.to2Cost">
          <p class="financial-prop-data">Стоимость КР, руб.</p>
          <input class="financial-inp" v-model="reportData.krCost">
        </div>
        <button class="btn-financial" @click="updateReportData">Обновить</button>
      </fieldset>
    </div>
    <div>
      <fieldset class="block-item fieldset-financial-car">
        <legend class="bold-legend-financial">Прогноз по каждому автомобилю</legend>
        <table class="financial-cars-table">
          <tr class="table-header">
            <th>id</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Номер</th>
            <th>Среднесуточный пробег, км</th>
            <th>Пробег за год, км</th>
            <th>Количество ТО-1, ед</th>
            <th>Затраты на ТО-1, руб</th>
            <th>Количество ТО-2, ед</th>
            <th>Затраты на ТО-2, руб</th>
            <th>Количество КР, ед</th>
            <th>Затраты на КР, руб</th>
            <th>Затраты итого, руб</th>
          </tr>
          <tr class="row" v-for="(car) in report.carFinancialReports" :key="car">
            <td>{{car.id}}</td>
            <td>{{car.brand}}</td>
            <td>{{car.model}}</td>
            <td class="plate-cell"><PlateNumber :license-plate-number="car.licensePlate"></PlateNumber></td>
            <td>{{car.avgKilometrage}}</td>
            <td>{{car.yearKilometrage}}</td>
            <td>{{car.numOfTo1}}</td>
            <td>{{car.costOfTo1}}</td>
            <td>{{car.numOfTo2}}</td>
            <td>{{car.costOfTo2}}</td>
            <td>{{car.numOfKr}}</td>
            <td>{{car.costOfKr}}</td>
            <td class="bold-cell">{{getAllCosts(car)}}</td>
          </tr>
        </table>
      </fieldset>

    </div>

  </div>

</template>

<script>
import {FinancialReportService} from "@/services/FinancialReportService";
import {NumWorkingDays} from "@/pages/main/components/financialReport/model/NumWorkingDays";
import PlateNumber from "@/pages/main/components/cars/plateNumber/PlateNumber";

export default {
  name: "FinancialReport",
  components: {PlateNumber},
  data(){
    return {
      report:{},
      reportData:{},
      NumWorkingDays: NumWorkingDays
    }
  },
  mounted() {
    this.getFinancialReport();
    this.getFinancialReportData();
  },
  methods:{
    getAllCosts(car) {
      return car.costOfTo1 + car.costOfTo2 + car.costOfKr;
    },
    getFinancialReport() {
      FinancialReportService.getFinancialReport().then(res => {
        res.carFinancialReports.sort((a, b)=>a.id - b.id);
        this.report = res;
      });
    },
    getFinancialReportData() {
      FinancialReportService.getFinancialReportData().then(res => {
        console.log(res);
        this.reportData = res;
      });
    },
    updateReportData() {
      FinancialReportService.updateFinancialReportData(this.reportData).then(res => {
        this.reportData = res;
        this.getFinancialReport();
      });
    }
  }
}
</script>

<style scoped>
.block-item{
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 85%;
  margin: 0px 20px 20px 0;
}
.block-item-data{
  margin-left: 0;
  margin-right: 0;
}
.container-financial{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
.bold-legend-financial{
  font-size: 20px;
  font-weight: bold;
}
.financial-prop{
  font-size: 17px;
}
.bold-prop{
  font-weight: bold;
}
.financial-inp{
  font-size: 16px;
  width: 170px;
  height: 20px;
}
.financial-prop-data{
  margin-bottom: 5px;
}
.select-financial{
  width: 178px;
  height: 26px;
  font-size: 16px;
}
.btn-financial{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  width: 140px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 17px;
  height: 35px;
  margin: 15px 0 0 0px;
}
.btn-financial:hover{
  border-color: black;
}
.fieldset-financial-car{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin-right: 40px;
  padding-bottom: 20px;
}
.common-container{
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  overflow: auto;
  max-height: 100%;
}
.common-container::-webkit-scrollbar{
  width: 0;
}
.financial-cars-table{
  font-size: 18px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
.table-header{
  width: 100%;
  text-align: center;
  vertical-align: center;
}
td{
  border-bottom-style: solid;
  border-bottom-width: 1px;

  padding: 10px;
  border-color: #c0bfbf;
}

th{
  padding: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: black;
}
.plate-cell{
  width: 15%;
  text-align: center;
}

.bold-cell{
  font-weight: bold;
}
</style>