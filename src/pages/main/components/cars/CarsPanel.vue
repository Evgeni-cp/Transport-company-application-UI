<template>
  <div class="container">
    <div class="left-side">
      <SearchField ph-text="Поиск по фамилии водителя"
                   :elements="cars"
                   :search-params="[
                     {value: 'id', text:'ID'},
                     {value: 'brand', text:'Марка'},
                     {value: 'model', text:'Модель'},
                     {value: 'licensePlate', text:'Номер'},
                     {value: 'year', text:'Год'},
                     {value: 'driver', text:'Водитель'}
                     ]"
                   @resultFound="getFoundedCars"
                   @clear="clearSearchField"></SearchField>
      <table class="cars-table">
        <tr class="table-header"><th>id</th><th>Марка</th><th>Модель</th><th>Номер</th></tr>
        <tr class="row" v-for="(c, index) in currentCars" :key="index"
            v-bind:class="{warning: isWarning(c), danger:isDanger(c)}"
            @click="selectedIndex = index">
          <td>{{c.id}}</td>
          <td>{{c.brand}}</td>
          <td>{{c.model}}</td>
          <td class="plate-cell"><PlateNumber :license-plate-number="c.licensePlate"></PlateNumber></td>
        </tr>
      </table>
      <button class="add-btn" @click="this.addCarModalOpen = true">+</button>
    </div>
    <AddCarModal v-if="addCarModalOpen" @exit="closeAddCarModal" @saveCar="addCar"></AddCarModal>
    <div class="right-side">
      <CarInfo v-if="isDataLoaded && this.currentCars.length !== 0" v-bind:car="this.currentCars[selectedIndex]"
               @doTo1="doTo1"
               @doTo2="doTo2"
               @doKr="doKr"
               @deleteCar="deleteCarById"
               @update="handleUpdatedCar"></CarInfo>
    </div>
  </div>
</template>

<script>
import {CarService} from "@/services/CarService";
import CarInfo from "@/pages/main/components/cars/CarInfo";
import AddCarModal from "@/pages/main/components/cars/modals/AddCarModal";
import SearchField from "@/pages/main/components/SearchField";
import PlateNumber from "@/pages/main/components/cars/plateNumber/PlateNumber";

export default {
  name: "CarsPanel",
  components: {PlateNumber, SearchField, AddCarModal, CarInfo},
  data: function () {
    return {
      cars: [],
      currentCars:[],
      currentCarsInit:false,
      selectedCar: null,
      selectedIndex: -1,
      updater: {},
      isDataLoaded: false,
      addCarModalOpen: false,
      searchFieldClear:true
    }
  },

  mounted() {
    this.getCars();
    this.updater = this.updateData();
  },

  unmounted() {
    clearInterval(this.updater);
  },

  methods:{
    updateData(){
      return setInterval((this.getCars), 2000);
    },
    getCars(){
      CarService.getAllCars().then(result => {
        if(result.status === 200){
          this.cars = result.cars.sort((a, b)=>a.id - b.id);
          if(this.cars.length !== 0 && this.selectedIndex === -1){
            this.selectedIndex = 0;
            this.isDataLoaded = true;
          }
          if(!this.currentCarsInit || this.searchFieldClear){
            this.currentCars = this.cars;
            this.currentCarsInit = true;
          }
        }
      })
    },
    isWarning(car){
      if((car.kmBeforeTo1 > 0 && car.kmBeforeTo1 < car.factTo1 * 0.05)
          || (car.kmBeforeTo2 > 0 && car.kmBeforeTo2 < car.factTo2 * 0.05)
          || (car.kmBeforeKr > 0 && car.kmBeforeKr < car.factKr * 0.05)){
        return true;
      }
    },
    isDanger(car){
      if(car.kmBeforeTo1 <= 0 || car.kmBeforeTo2 <=0 || car.kmBeforeKr <=0){
        return true;
      }
    },
    setSelectedCar(c){
      this.selectedCar = c;
      this.isDataLoaded = true;
    },
    doMaintenance(car){
      CarService.doMaintenance(car.id).then(result =>{
            this.handleUpdatedCar(result);
        }
      );
    },
    doTo1(car){
      CarService.doTo1(car.id).then(result =>{
            this.handleUpdatedCar(result);
          }
      );
    },
    doTo2(car){
      CarService.doTo2(car.id).then(result =>{
            this.handleUpdatedCar(result);
          }
      );
    },
    doKr(car){
      CarService.doKr(car.id).then(result =>{
            this.handleUpdatedCar(result);
          }
      );
    },
    deleteCarById(car){
      CarService.deleteCarById(car.id).then(
          ()=>{
            if(this.cars.indexOf(car) === this.selectedIndex){
              this.selectedIndex = 0;
            }
            this.cars.splice(this.cars.indexOf(car),1);
            if(!this.searchFieldClear){
              this.currentCars.splice(this.currentCars.indexOf(car),1);
            }
          }
      )
    },
    handleUpdatedCar(updatedCar){
      this.cars[this.cars.map((car)=>car.id).indexOf(updatedCar.id)] = updatedCar;
      if(!this.searchFieldClear){
        this.currentCars[this.currentCars.map((car)=>car.id).indexOf(updatedCar.id)] = updatedCar;
      }
    },
    closeAddCarModal(){
      this.addCarModalOpen = false;
    },
    addCar(car){
      console.log('addCar');
      this.cars.push(car);
      if(!this.searchFieldClear){
        this.currentCars.push(car);
      }
      this.addCarModalOpen = false;
    },
    getFoundedCars(cars){
      this.searchFieldClear=false;
      this.currentCars = cars;
    },
    clearSearchField(){
      this.searchFieldClear = true;
      this.currentCars = this.cars;
    }

  }
}
</script>

<style scoped>
.container{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  height: 100%;
  width: 100%;
  background-color: white;
  margin: 0;
  box-sizing: border-box;
}

.right-side, .left-side {
  height: 100%;
}

.left-side{
  width: 30%;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: gray;
  overflow: auto;
}

.left-side::-webkit-scrollbar{
  width: 0;
}

.right-side{
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  width: 70%;
  overflow: auto;
}

.right-side::-webkit-scrollbar{
  width: 0;
}

.cars-table{
  font-size: 18px;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

table.cars-table tr:hover td{
  background-color: gainsboro;
}

.table-header{
  width: 100%;
  text-align: center;
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
}

.warning{
  background-color: #ffea76;
}

.danger{
  background-color: #f88181;
}

.add-btn{
  padding-left: 10px;
  padding-right: 10px;
  font-size: 35px;
  margin-top: 10px;
  margin-left: 10px;
  display:block;
  float:none;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 25px;
}

.add-btn:hover{
  border-color: black;
}

.plate-cell{
  width: 45%;
}
</style>