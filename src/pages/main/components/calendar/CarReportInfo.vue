<template>
  <table class="without-border">
    <tr class="row">
      <td>id {{carInfo.id}}</td>
      <td>{{carInfo.brand}}</td>
      <td>{{carInfo.model}}</td>
    </tr>
    <tr>
      <td colspan="3"><PlateNumber :license-plate-number=carInfo.licensePlate></PlateNumber></td>
    </tr>
  </table>


</template>

<script>
import PlateNumber from "@/pages/main/components/cars/plateNumber/PlateNumber";
export default {
  name: "CarReportInfo",
  components: {PlateNumber},

props:{
  carInfo:Object
}

}
</script>

<style scoped>
.row{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.plate-number-box{
  width: 100%;
}
table{
  width: 100%;
}
.without-border{
  border-style: hidden;
}
table td{
  text-align: center;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}
.row  {
  display: flex;
  justify-content: space-around;
}

</style>