<template>
  <GMapMap :center="{lat: 56.299678, lng: 44.069121}"
           :zoom="11"
           map-type-id="roadmap"
           style="height: 100%;width: 100%"
           class="google-map">
    <CarMarker v-for="c in cars" :car="c" :key="c.id"></CarMarker>
  </GMapMap>
</template>

<script>
import {CarService} from "@/services/CarService";
import CarMarker from "@/pages/main/components/map/CarMarker";

export default {
  name: "MainMap",
  components: {CarMarker},
  data: function () {
    return {
      cars: [],
      updater: {}
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
          console.log(result.status);
          console.log(result.cars);
          this.cars = result.cars;
        }
      })
    }
  }
}
</script>

<style scoped>
.google-map {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  background: gray;
}
</style>