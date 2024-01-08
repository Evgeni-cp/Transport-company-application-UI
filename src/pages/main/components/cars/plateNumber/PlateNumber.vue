<template>
  <div  id="mainPlate" class="plate-box" v-resize="onResize">
    <div class="left-part">
      <p v-bind:style="'font-size:' + this.numberSize + 'px'" class="left-part-number">
        {{mainNumber}}
      </p>
    </div>
    <div class="right-part">
      <p v-bind:style="'font-size:' + this.regionSize + 'px'" class="region">
        {{regionNumber}}
      </p>
      <div class="country-box">
        <p v-bind:style="'font-size:' + this.countrySize + 'px'" class="region-text">
          RUS
        </p>
        <div class="country-img-box">
          <CountryFlag></CountryFlag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from "@/pages/main/components/cars/plateNumber/CountryFlag";
export default {
  components: {CountryFlag},
  name: "PlateNumber",
  methods:{
    onResize(){
      let mainPlate = document.getElementById('mainPlate');
      this.numberSize = mainPlate.clientWidth * 0.1730769230769231;
      this.regionSize = mainPlate.clientWidth * 0.1057692307692308;
      this.countrySize = mainPlate.clientWidth * 0.0519230769230769;
      console.log(mainPlate.clientWidth);
    },
    initNumber(){
      this.mainNumber = this.licensePlateNumber.substring(0, 6);
      this.regionNumber = this.licensePlateNumber.substring(6);
      console.log(this.mainNumber);
      console.log(this.regionNumber);
    }
  },
  props:{
    licensePlateNumber: String
  },
  data(){
    return{
      regionNumber: "",
      mainNumber:"",
      numberSize: 90,
      regionSize: 55,
      countrySize: 27
    }
  },
  mounted() {
    this.onResize();
    this.initNumber();
  }
}
</script>

<style scoped>
.left-part-numbers{
  font-size: 80px;
}
.left-part-number{
  color: black;
  text-align: center;
  letter-spacing: 5px;
  margin: 0;
  font-size: 90px;
  font-weight: 550;
}
.plate-box{
  font-family: "RoadNumders", Helvetica, Arial;
  background-color: black;
  display: grid;
  grid-template-columns: 72% 28%;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  width: 90%;
  height: 100%;
  border-color: black;
  margin-left: auto;
  margin-right: auto;
}

.left-part{
  background-color: white;
  margin: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: black;
}

.right-part{
  background-color: white;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 63% 37%;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: black;
}

.region{
  color: black;
  font-size: 55px;
  font-weight: 550;
  display: flex;
  text-align: center;
  margin: auto;
}

.region-text{
  font-family: Helvetica;
  margin: 0;
  color: black;
  font-size: 27px;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: end;
  align-self: center;
}

.country-box{
  display: grid;
  grid-template-columns: 55% 45%;
}

.country-text{
  width: 50%;
  height: 80%;
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  vertical-align: center;
}

.country-img-box{
  margin-left: 4px;
  width: 70%;
  height: 60%;
  align-self: center;
  border-style: solid;
  border-width: 1px;
  border-color: black;
}

</style>