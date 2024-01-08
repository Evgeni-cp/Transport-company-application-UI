<template>
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <label class="modal-title">Редактирование данных</label>
      <button @click="exit" class="exit-btn">&#10006;</button>
    </div>
    <ul v-if="this.errors.length !== 0">
      <li class="err-record" v-for:="(error, index) in errors" :key="index">{{error.details}}</li>
    </ul>
    <div class="info-block">
      <fieldset class="block-item">
        <legend>Основная информация</legend>
        <p>Марка:
          <input name="brand" class="input-field" type="text" v-model="updatedCar.brand" v-on:change="changeValue">
        </p>
        <p>Модель:
          <input name="model" class="input-field" type="text" v-model="updatedCar.model" v-on:change="changeValue">
        </p>
        <p>Номер:
          <input name="licensePlate" class="input-field" type="text" v-model="updatedCar.licensePlate" v-on:change="changeValue">
        </p>
        <p>Год выпуска:
          <input name="year" class="input-field" type="number" v-model="updatedCar.year" v-on:change="changeValue">
        </p>
      </fieldset>
      <fieldset class="block-item">
        <legend>Пробег и ТО</legend>
        <p>Пробег, км:
          <input name="kilometrage" class="input-field" type="number" v-model="updatedCar.kilometrage" v-on:change="changeValue">
        </p>
        <p>Норматив ТО-1, км:
          <input name="normativeTo1" class="input-field" type="number" v-model="updatedCar.normativeTo1" v-on:change="changeValue">
        </p>
        <p>Норматив ТО-2, км:
          <input name="normativeTo2" class="input-field" type="number" v-model="updatedCar.normativeTo2" v-on:change="changeValue">
        </p>
        <p>Норматив КР, км:
          <input name="normativeKr" class="input-field" type="number" v-model="updatedCar.normativeKr" v-on:change="changeValue">
        </p>

      </fieldset>
      <fieldset class="block-item">
        <legend>Водитель</legend>
        <select class="driver-selector" v-model="this.updatedCar.driver" name="driver" v-on:change="changeValue">
          <option v-for="driver in optionsData" v-bind:value="driver.value" v-bind:key="driver.value">{{driver.text}}</option>
        </select>
        <div v-if="this.updatedCar.driver">
          <p>Фамилия: {{updatedCar.driver.lastName}}</p>
          <p>Имя: {{updatedCar.driver.firstName}}</p>
          <p>Отчество: {{updatedCar.driver.middleName}}</p>
          <p>Номер ВУ: {{updatedCar.driver.drivingLicense}}</p>
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
        <input class="input-field" type="number" v-model="updatedCar.latitude">
      </p>
      <p class="horizontal-p">
        Долгота:
        <input class="input-field" type="number" v-model="updatedCar.longitude">
      </p>
    </fieldset>
    <div class="modal-footer">
      <button @click="update" class="update-btn">Обновить</button>
    </div>
  </div>
</div>
</template>

<script>
import {CarService} from "@/services/CarService";
import {DriverService} from "@/services/DriverService";

export default {
  name: "UpdateCarModal",
  props:{
    car:Object
  },
  data(){
    return{
      updatedCar: JSON.parse(JSON.stringify(this.car)),
      freeDrivers:[],
      errors:[],
      optionsData:[],
      fieldsToUpdate:{}
    }
  },
  mounted() {
    this.freeDrivers.push({});
    if(this.updatedCar.driver){
      this.freeDrivers.push(this.updatedCar.driver);
    }
    this.getFreeDrivers();
  },
  methods:{
    getFreeDrivers(){
      DriverService.getFreeDrivers().then(result=>{
        console.log(result.data);
        this.freeDrivers = this.freeDrivers.concat(result.data);
        this.setOptionsData();
      })
    },
    exit(){
      this.$emit("exit");
    },
    update(){
      CarService.partialUpdate(this.updatedCar.id, this.fieldsToUpdate).then(result => {
        console.log(result.status);
        if(result.status===200){
          this.$emit('update', result.data);
        }else {
          this.errors = result.data.errors;
        }
      });
    },
    changeValue(event){
      if(event.target.name === "driver"){
        this.fieldsToUpdate["driver"] = this.updatedCar.driver;
      }else {
        if(event.target.type === 'number'){
          this.fieldsToUpdate[event.target.name] = parseFloat(event.target.value);
        }else {
          this.fieldsToUpdate[event.target.name] = event.target.value;
        }

      }
      console.log();
      console.log(this.fieldsToUpdate);
    },
    setOptionsData(){
      for(let i = 0;i < this.freeDrivers.length;i++){
        if(this.freeDrivers[i].id){
          this.optionsData.push({text: this.getFIO(this.freeDrivers[i]), value: this.freeDrivers[i]})
        }else {
          this.optionsData.push({text: "Не назначен", value: null});
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