import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const CalendarService = {
    getMaintDates,
    getCarsYearMaintCalendar
}

async function getMaintDates(id) {
    return await HTTP.get("/api/calendar/next-maint-dates/"+id, getHeaders())
        .then((response)=>{
            return response.data;
        }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    });
}

async function getCarsYearMaintCalendar() {
    return await HTTP.get("/api/calendar/maint-cars", getHeaders())
        .then((response)=>{
            return response.data;
        }).catch((error)=>{
            console.log(error.response);
            return {status: error.response.status};
        });
}