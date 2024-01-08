<template>
  <div class="container">
    <h1>Данные для корректировки нормативного пробега</h1>

<p class="name-of-correcting">Условия движения</p>
  <select class="select-correcting" v-model="correctingData.cityType">
    <option :value=CityType.OUT.value>{{CityType.OUT.description}}</option>
    <option :value=CityType.SMALL.value>{{CityType.SMALL.description}}</option>
    <option :value=CityType.LARGE.value>{{CityType.LARGE.description}}</option>
  </select>
<p class="name-of-correcting">Группа дорог</p>
  <select class="select-correcting" v-model="correctingData.roadType">
    <option :value=RoadType.D1.value>{{RoadType.D1.description}}</option>
    <option :value=RoadType.D2.value>{{RoadType.D2.description}}</option>
    <option :value=RoadType.D3.value>{{RoadType.D3.description}}</option>
    <option :value=RoadType.D4.value>{{RoadType.D4.description}}</option>
    <option :value=RoadType.D5.value>{{RoadType.D5.description}}</option>
  </select>
<p class="name-of-correcting">Рельеф местности, определяется высотой над уровнем моря</p>
  <select class="select-correcting" v-model="correctingData.reliefType">
    <option class="select-option" :value=ReliefType.R1.value>{{ReliefType.R1.description}}</option>
    <option :value=ReliefType.R2.value>{{ReliefType.R2.description}}</option>
    <option :value=ReliefType.R3.value>{{ReliefType.R3.description}}</option>
    <option :value=ReliefType.R4.value>{{ReliefType.R4.description}}</option>
    <option :value=ReliefType.R5.value>{{ReliefType.R5.description}}</option>
  </select>
<p class="name-of-correcting">Климатический район</p>
  <select class="select-correcting" v-model="correctingData.climateType">
    <option :value=ClimateType.TEMPERATE.value>{{ClimateType.TEMPERATE.description}}</option>
    <option :value=ClimateType.WARM_TEMPERATE.value>{{ClimateType.WARM_TEMPERATE.description}}</option>
    <option :value=ClimateType.HOT_DRY.value>{{ClimateType.HOT_DRY.description}}</option>
    <option :value=ClimateType.MODERATELY_COLD.value>{{ClimateType.MODERATELY_COLD.description}}</option>
    <option :value=ClimateType.COLD.value>{{ClimateType.COLD.description}}</option>
    <option :value=ClimateType.VERY_COLD.value>{{ClimateType.VERY_COLD.description}}</option>
  </select>
  <button class="correcting-btn" @click="updateCorrectingData">Обновить</button>
  </div>
</template>

<script>
import {CorrectingService} from "@/services/CorrectingService";
import CityType from "@/pages/main/components/correcting/model/CityType";
import {RoadType} from "@/pages/main/components/correcting/model/RoadType";
import {ReliefType} from "@/pages/main/components/correcting/model/ReliefType";
import {ClimateType} from "@/pages/main/components/correcting/model/ClimateType";

export default {
  name: "CorrectingPanel",
  data(){
    return{
      CityType: CityType,
      RoadType: RoadType,
      ReliefType: ReliefType,
      ClimateType: ClimateType,
      correctingData: {}
    }
  },
  mounted() {
    this.getCorrectingData();
  },
  methods:{
    getCorrectingData(){
      CorrectingService.getCorrectingData().then(res => {
        console.log(res);
        this.correctingData = res.correctingData;
      })
    },
    updateCorrectingData() {
      CorrectingService.updateCorrectingData(this.correctingData).then(res => {
        console.log(res);
        this.correctingData = res.correctingData;
      })
    }
  }
}
</script>

<style scoped>
.container{
  margin-left: 25%;
  margin-top: 7%;
  display: flex;
  flex-direction: column;
}
.name-of-correcting{
  margin-bottom: 8px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 19px;
}
h1{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 20px;
  font-size: 30px;
}
.select-correcting{
  height: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 17px;
  width: 760px;
  margin-bottom: 10px;
}
.correcting-btn{
  padding: 7px;
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 3px;
  width: 170px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 19px;
  height: 40px;
  margin: 30px 0 0 300px;
}
.correcting-btn:hover{
  border-color: black;
}
</style>