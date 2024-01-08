<template>
  <div class="calendar-container">
    <CalendarItem class="calendar-item" v-for="(carCalendar) in maintCalendar" :key="carCalendar" :carCalendar="carCalendar"></CalendarItem>
  </div>
</template>

<script>
import {CalendarService} from "@/services/CalendarService";
import CalendarItem from "@/pages/main/components/calendar/CalendarItem";

export default {
  name: "CalendarPanel",
  components: {CalendarItem},

  data(){
    return {
      maintCalendar: []
    }
  },
  mounted() {
    this.getMaintCalendar();
  },
  methods:{
    getMaintCalendar() {
      CalendarService.getCarsYearMaintCalendar().then(res => {
        res.calendar.sort((a, b)=>a.id - b.id);
        this.maintCalendar = res.calendar;
      });
    }
  }
}
</script>

<style scoped>
.calendar-container{
  overflow: auto;
  max-height: 96%;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
}
.calendar-container::-webkit-scrollbar{
  width: 0;
}
.calendar-item{
  margin-top: 10px;
  margin-bottom: 25px;
}
</style>