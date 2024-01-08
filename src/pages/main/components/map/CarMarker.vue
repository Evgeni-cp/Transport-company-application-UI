<template>
  <GMapMarker :position="getPosition()"
              :icon="getIcon()"
              @click="openInfoWindow()">
      <GMapInfoWindow :opened="infoWindowOpen"
                      :position="getPosition()"
                      :closeclick="true"
                      @closeclick="closeInfoWindow()">
        <div class="info-window">
          <p class="title">{{this.car.brand}} {{this.car.model}}</p>
          <p><span class="bold-word">Номер:</span> {{this.car.licensePlate}}</p>
          <p><span class="bold-word">ТО-1 через:</span> {{this.car.kmBeforeTo1}} км.</p>
          <p><span class="bold-word">ТО-2 через:</span> {{this.car.kmBeforeTo2}} км.</p>
          <p><span class="bold-word">КР через:</span> {{this.car.kmBeforeKr}} км.</p>
        </div>
      </GMapInfoWindow>
  </GMapMarker>

</template>

<script>
import goodMarker from "@/assets/marker_good.png"
import warningMarker from "@/assets/marker_warning.png"
import badMarker from "@/assets/marker_bad.png"
export default {
  name: "CarMarker",
  data(){
    return{
      infoWindowOpen: false
    }
  },
  props: {
    car:{}
  },
  methods:{
    getPosition(){
      return{lat: this.car.latitude,lng: this.car.longitude}
    },

    getIcon(){
      if(this.car.kmBeforeTo1 <= 0
          || this.car.kmBeforeTo2 <= 0
          || this.car.kmBeforeKr <=0) {
        return badMarker;
      }else if(this.car.kmBeforeTo1 < this.car.factTo1 * 0.05
          || this.car.kmBeforeTo2 < this.car.factTo2 * 0.05
          || this.car.kmBeforeKr < this.car.factKr * 0.05){
        return warningMarker;
      }else {
        return goodMarker;
      }
    },

    openInfoWindow(){
      this.infoWindowOpen = true;
    },

    closeInfoWindow(){
      this.infoWindowOpen = false;
    }


  }
}
</script>

<style scoped>

.info-window{
  font-size: 14px;
}

.title{
  font-size: 16px;
  font-weight: bold;
}

.bold-word{
  font-weight: bold;
}

</style>