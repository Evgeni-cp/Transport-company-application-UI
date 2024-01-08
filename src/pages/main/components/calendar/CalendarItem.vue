<template>
  <div class="calendar-item">
    <table class="item-table">
            <tr>
              <td class="info-item" rowspan="3"><CarReportInfo :car-info="carCalendar"></CarReportInfo></td>
              <td class="dates-row"><span class="bold-text">Даты ТО-1: </span>{{this.getDatesAsString(carCalendar.to1Dates)}}</td>
            </tr>
            <tr>
              <td class="dates-row"><span class="bold-text">Даты ТО-2: </span>{{this.getDatesAsString(carCalendar.to2Dates)}}</td>
            </tr>
            <tr>
              <td class="dates-row"><span class="bold-text">Даты КР: </span>{{this.getDatesAsString(carCalendar.krDates)}}</td>
            </tr>
    </table>
  </div>
</template>

<script>
import CarReportInfo from "@/pages/main/components/calendar/CarReportInfo";
export default {
  name: "CalendarItem",
  components: {CarReportInfo},

  props:{
    carCalendar:Object
  },

  methods:{
    getDatesAsString(datesArray) {
      let string = "";
      datesArray.forEach(date => string += date + ", ");
      if (string !== "") {
        string = string.substring(0, string.length - 2);
      }
      return string;
    }
  }
}
</script>

<style scoped>
.bold-text{
  font-weight: bold;
}
.dates-row{
  padding: 6px;
  white-space: break-spaces;
  width: 100%;
}
.item-table{
  border-style: solid;
  border-collapse: collapse;
  border-color: black;
  border-width: 2px;
  width: 100%;
}

.calendar-item{
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
}
tr{
  border-width: 1px;
  border-style: solid;
}
td{
  border-width: 1px;
  border-style: solid;
}
.info-item{
  width: 20%;
  font-size: 23px;
}
</style>