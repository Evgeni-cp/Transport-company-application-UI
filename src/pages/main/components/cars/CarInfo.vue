<template>
  <div class="info-container">
    <div class="info-block">
      <fieldset class="block-item">
        <legend class="bold-legend">Основная информация</legend>
        <p>Марка: {{car.brand}}</p>
        <p>Модель: {{car.model}}</p>
        <p>Номер: {{car.licensePlate}}</p>
        <p>Год выпуска: {{car.year}}</p>
        <p>Пробег: {{car.kilometrage}} км.</p>
        <p>Среднесуточный пробег: {{car.avgKilometrage}} км.</p>
      </fieldset>
      <fieldset class="block-item-middle">
        <legend class="bold-legend">Техническое обслуживание и капитальный ремонт</legend>
        <table class="to-table">
          <tr><th>Воздействие</th><th>Норматив, км.</th><th>Факт, км.</th><th>Остаток, км.</th><th>Дата</th></tr>
          <tr>
            <td>ТО-1</td>
            <td>{{car.normativeTo1}}</td>
            <td>{{car.factTo1}}</td>
            <td>{{car.kmBeforeTo1}}</td>
            <td>{{maintDates.nextTo1Date}}</td>
          </tr>
          <tr>
            <td>ТО-2</td>
            <td>{{car.normativeTo2}}</td>
            <td>{{car.factTo2}}</td>
            <td>{{car.kmBeforeTo2}}</td>
            <td>{{maintDates.nextTo2Date}}</td>
          </tr>
          <tr>
            <td>КР</td>
            <td>{{car.normativeKr}}</td>
            <td>{{car.factKr}}</td>
            <td>{{car.kmBeforeKr}}</td>
            <td>{{maintDates.nextKrDate}}</td>
          </tr>
        </table>
        <p>
          <button class="edit-btn marg-btn" @click="to1DialogOpen = true">Провести ТО-1</button>
          <button class="edit-btn marg-btn" @click="to2DialogOpen = true">Провести ТО-2</button>
          <button class="edit-btn marg-btn" @click="krDialogOpen = true">Провести КР</button>
        </p>
      </fieldset>
      <fieldset class="block-item">
        <legend class="bold-legend">Водитель</legend>
        <div v-if="car.driver">
          <p>Фамилия: {{car.driver.lastName}}</p>
          <p>Имя: {{car.driver.firstName}}</p>
          <p>Отчество: {{car.driver.middleName}}</p>
          <p>Номер ВУ: {{car.driver.drivingLicense}}</p>
        </div>
        <div v-else>
          <p>Водитель не назначен</p>
        </div>
      </fieldset>
    </div>
    <fieldset class="chart-fieldset">
      <legend>
        <select class="period-selector bold-legend" v-model="statisticsPeriod">
          <option value="week">Пробег за неделю</option>
          <option value="month">Пробег за месяц</option>
          <option value="year">Пробег за год</option>
        </select>
      </legend>
      <div class="chart-container">
        <CarChart v-if="isDataLoaded" class="chart" :options="chartOptions.options" :series="chartOptions.series"></CarChart>
      </div>
    </fieldset>
    <div class="info-block">

      <fieldset class="control-fieldset">
        <legend class="bold-legend">Управление</legend>
            <button class="edit-btn" @click="updateCarModalOpen = true">Редактировать</button>
            <button class="delete-btn" @click="deleteDialogOpen = true">Удалить</button>
      </fieldset>
    </div>

    <ConfirmDialog v-if="deleteDialogOpen" @yes="positiveDeleteDialogHandler" @no="negativeDeleteDialogHandler"></ConfirmDialog>
    <ConfirmDialog v-if="to1DialogOpen" @yes="positiveTo1DialogHandler" @no="negativeMaintenanceDialogHandler"></ConfirmDialog>
    <ConfirmDialog v-if="to2DialogOpen" @yes="positiveTo2DialogHandler" @no="negativeMaintenanceDialogHandler"></ConfirmDialog>
    <ConfirmDialog v-if="krDialogOpen" @yes="positiveKrDialogHandler" @no="negativeMaintenanceDialogHandler"></ConfirmDialog>
    <UpdateCarModal v-if="updateCarModalOpen"
                    :car = "car"
                    @exit="updateCarModalExit"
                    @update="updateCarModalSuccess"></UpdateCarModal>

  </div>
</template>

<script>
import {HistoryService} from "@/services/HistoryService";
import CarChart from "@/pages/main/components/cars/CarChart";
import {getChatrConfiguration} from "@/utils/ChatrUtil";
import ConfirmDialog from "@/pages/main/components/cars/modals/ConfirmDialog";
import UpdateCarModal from "@/pages/main/components/cars/modals/UpdateCarModal";
import {CalendarService} from "@/services/CalendarService";
export default {
  name: "CarInfo",
  components: { UpdateCarModal, ConfirmDialog, CarChart},
  props: {
    car:Object
  },

  mounted() {
    console.log(this.car.driver);
    this.isDataLoaded = false;
    this.getWeeklyStat();
    this.getNextMaintDates();
  },
  watch:{
    car(){
      this.getStatistics();
      this.getNextMaintDates();
    },
    statisticsPeriod(){
      this.getStatistics();
    }
  },

  data () {
    return {
      isDataLoaded: false,
      chartOptions: {},
      deleteDialogOpen: false,
      to1DialogOpen: false,
      to2DialogOpen: false,
      krDialogOpen: false,
      updateCarModalOpen:false,
      statisticsPeriod: "week",
      maintDates:{}
    }
  },
  methods:{
    getNextMaintDates(){
      CalendarService.getMaintDates(this.car.id).then(res => {
        console.log(res);
        this.maintDates = res;
      });
    },
    getWeeklyStat(){
      HistoryService.getWeeklyStatistics(this.car.id).then(res => {
        this.chartOptions = getChatrConfiguration(res.kilometrage, res.week);
        this.isDataLoaded = true;
      });
    },
    getMonthlyStat(){
      HistoryService.getMonthlyStatistics(this.car.id).then(res => {
        this.chartOptions = getChatrConfiguration(res.kilometrage, res.month);
      })
    },
    getYearStat(){
      HistoryService.getYearStatistics(this.car.id).then(res => {
        this.chartOptions = getChatrConfiguration(res.kilometrage, res.year);
      })
    },
    doMaintenance(){
      this.$emit('doMaintenance', this.car);
    },
    doTo1(){
      this.$emit('doTo1', this.car);
    },
    doTo2(){
      this.$emit('doTo2', this.car);
    },
    doKr(){
      this.$emit('doKr', this.car);
    },
    deleteCar(){
      this.$emit('deleteCar', this.car);
    },
    positiveDeleteDialogHandler(){
      this.deleteDialogOpen = false;
      this.deleteCar();
    },
    negativeDeleteDialogHandler(){
      this.deleteDialogOpen = false;
    },
    positiveTo1DialogHandler(){
      this.doTo1();
      this.to1DialogOpen = false;
    },
    positiveTo2DialogHandler(){
      this.doTo2();
      this.to2DialogOpen = false;
    },
    positiveKrDialogHandler(){
      this.doKr();
      this.krDialogOpen = false;
    },
    negativeMaintenanceDialogHandler(){
      this.to1DialogOpen = false;
      this.to2DialogOpen = false;
      this.krDialogOpen = false;
    },
    updateCarModalExit(){
      this.updateCarModalOpen = false;
    },
    updateCarModalSuccess(updatedCar){
      this.updateCarModalOpen = false;
      this.$emit('update', updatedCar);
    },
    getStatistics(){
      switch (this.statisticsPeriod){
        case "week":
          this.getWeeklyStat();
          break;
        case "month":
          this.getMonthlyStat();
          break;
        case "year":
          this.getYearStat();
          break;
      }
    }
  }
}

</script>

<style scoped>
.chart{
  height: 100%;
  width: 100%;
}
.chart-container{
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  box-sizing: border-box;
}
.info-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.info-block{
  display: flex;
}

.block-item{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 25%;
}

.block-item-middle{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 50%;
}

.chart-fieldset{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}

.edit-btn{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  font-size: 16px;
}

.delete-btn{
  padding: 7px;
  color: white;
  background: #ff1414;
  border: 1px solid #ff1414;
  border-radius: 3px;
  margin-left:20px;
  font-size: 16px;
}

.edit-btn:hover{
  border-color: black;
}

.delete-btn:hover{
  border-color: black;
}

.control-fieldset{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}

.period-selector{
  border-style: none;
  font-size: inherit;
}

.to-table{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

td{
  border-bottom-style: solid;
  border-bottom-width: 1px;

  padding-top: 10px;
  padding-bottom: 10px;
  border-color: #c0bfbf;

}

th{
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: black;
  text-shadow: black 0px 0px 0.6px;
  font-weight: normal;

}

.marg-btn{
  margin-left: 5%;
  margin-right: 5%;
}
.bold-legend{
  font-weight: bold;
}

</style>