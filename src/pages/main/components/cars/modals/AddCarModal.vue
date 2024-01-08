<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <label class="modal-title">Добавить новый автомобиль</label>
        <button @click="exit" class="exit-btn">&#10006;</button>
      </div>
      <ul v-if="this.errors.length !== 0">
        <li class="err-record" v-for:="(error, index) in errors" :key="index">{{error.details}}</li>
      </ul>
      <div class="info-block">
        <fieldset class="block-item">
          <legend>Основная информация</legend>
          <p>Марка:
            <input class="input-field" type="text" v-model="savedCar.brand">
          </p>
          <p>Модель:
            <input class="input-field" type="text" v-model="savedCar.model">
          </p>
          <p>Номер:
            <input class="input-field" type="text" v-model="savedCar.licensePlate">
          </p>
          <p>Год выпуска:
            <input class="input-field" type="number" v-model="savedCar.year">
          </p>
        </fieldset>
        <fieldset class="block-item">
          <legend>Пробег и ТО</legend>
          <p>Пробег, км:
            <input class="input-field" type="number" v-model="savedCar.kilometrage">
          </p>
          <p>Норматив ТО-1, км:
            <input class="input-field" type="number" v-model="savedCar.normativeTo1">
          </p>
          <p>Норматив ТО-2, км:
            <input class="input-field" type="number" v-model="savedCar.normativeTo2">
          </p>
          <p>Норматив КР, км:
            <input class="input-field" type="number" v-model="savedCar.normativeKr">
          </p>

        </fieldset>
        <fieldset class="block-item">
          <legend>Водитель</legend>
          <select class="driver-selector" v-model="this.savedCar.driver">
            <option v-for="driver in optionsData" v-bind:value="driver.value" v-bind:key="driver.value">{{driver.text}}</option>
          </select>
          <div v-if="savedCar.driver">
            <p>Фамилия: {{savedCar.driver.lastName}}</p>
            <p>Имя: {{savedCar.driver.firstName}}</p>
            <p>Отчество: {{savedCar.driver.middleName}}</p>
            <p>Номер ВУ: {{savedCar.driver.drivingLicense}}</p>
          </div>
          <div v-else>
            <p>Водитель не назначен</p>
          </div>
        </fieldset>
      </div>
      <fieldset class="place-fieldset">
        <legend>Местоположение</legend>
        <p class="horizontal-p">
          Широта:
          <input class="input-field" type="number" v-model="savedCar.latitude">
        </p>
        <p class="horizontal-p">
          Долгота:
          <input class="input-field" type="number" v-model="savedCar.longitude">
        </p>
      </fieldset>
      <div class="modal-footer">
        <button @click="save" class="update-btn">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>

import {CarService} from "@/services/CarService";
import {DriverService} from "@/services/DriverService";

export default {
  name: "AddCarModal",
  data(){
    return{
      savedCar: {},
      errors:[],
      freeDrivers:[],
      optionsData:[],
      DEFAULT_LATITUDE: 56.262796,
      DEFAULT_LONGITUDE: 44.003158
    }
  },
  mounted() {
    this.savedCar.latitude = this.DEFAULT_LATITUDE;
    this.savedCar.longitude = this.DEFAULT_LONGITUDE;
    this.freeDrivers.push({});
    this.getFreeDrivers();
  },
  methods:{
    exit(){
      this.$emit("exit");
    },
    save(){
      console.log(this.savedCar);
      CarService.saveCar(this.savedCar).then(result=>{
        console.log(result);
        if(result.status===201){
          this.$emit('saveCar', result.data);
        }else {
          this.errors = result.data.errors;
        }
      });
    },
    getFreeDrivers(){
      DriverService.getFreeDrivers().then(result=>{
        console.log(result.data);
        this.freeDrivers = this.freeDrivers.concat(result.data);
        this.setOptionsData();
      })
    },
    setOptionsData(){
      for(let i = 0;i < this.freeDrivers.length;i++){
        if(this.freeDrivers[i].id){
          this.optionsData.push({text: this.getFIO(this.freeDrivers[i]), value: this.freeDrivers[i]})
        }else {
          this.optionsData.push({text: "Не назначен", value: undefined});
        }
      }
    },
    getFIO(driver){
      return driver.lastName + " " + driver.firstName[0] + "." + driver.middleName[0] + ".";
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  width: 50%;
  padding: 5px;
}

.modal-header{
  display: flex;
  padding: 10px;
}

.modal-title{
  width: 95%;
  font-size: 24px;
  font-weight: bold;
}

.exit-btn{
  width: 5%;
  background-color: red;
  border-color: white;
  border-style: solid;
  border-radius: 4px;
  color: white;
}
.exit-btn{
  width: 5%;
  background-color: red;
  border-color: gray;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  color: white;
}

.exit-btn:hover{
  border-color: black;
}

.info-block{
  display: flex;
}

.block-item{
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 33%;
}

.input-field{
  margin-top: 5px;
  font-size: 16px;
}

.place-fieldset{
  display: flex;
  margin: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
}

.horizontal-p{
  width: 50%;
}
.modal-footer{
  width: 100%;
  height: auto;
  text-align: center;
}
.update-btn{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  margin:10px;
  font-size: 20px;
}

.update-btn:hover{
  border: 1px solid #000000;
}

.err-record{
  color: red;
}

.driver-selector{
  font-size: 16px;
}
</style>