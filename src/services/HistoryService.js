import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";
import moment from 'moment'

export const HistoryService = {
    getWeeklyStatistics,
    getMonthlyStatistics,
    getYearStatistics
}

async function getWeeklyStatistics(carId){
    let result = {week:[], kilometrage:[]};
    result.week = getWeek().reverse();
    result.kilometrage = await HTTP.post("/api/history/date",{id: carId, dates: result.week} ,getHeaders()).then(result=>{return result.data});
    result.week = getDDMMFormat(result.week);
    result.kilometrage = result.kilometrage.map(km => Math.floor(km));
    return result;
}

async function getMonthlyStatistics(carId){
    let result = {month:[], kilometrage:[]};
    result.month = getMonth().reverse();
    result.kilometrage = await HTTP.post("/api/history/date", {id: carId, dates: result.month}, getHeaders()).then(result=>{return result.data});
    result.month = getDDMMFormat(result.month);
    result.kilometrage = result.kilometrage.map(km => Math.floor(km));
    return result;
}


function getWeek(){
    let week = [];
    for (let i = 1; i <= 7; i++) {
        week.push(moment().subtract(i,"days").format("YYYY-MM-DD"));
    }
    return week;
}

async function getYearStatistics(carId){
    let result = {year:[], kilometrage:[]};
    let dateIntervals = getDatesIntervals().reverse();
    result.kilometrage = await HTTP.post("/api/history/date-interval", {id: carId, dateIntervals: dateIntervals}, getHeaders()).then(result=>{return result.data});
    console.log(result.kilometrage);
    result.year = getMonthsFromIntervals(dateIntervals);
    result.kilometrage = result.kilometrage.map(km => Math.floor(km));
    return result;
}

function getMonth(){
    let month = [];
    for (let i = 1; i <= 30; i++) {
        month.push(moment().subtract(i,"days").format("YYYY-MM-DD"));
    }
    return month;
}

function getDDMMFormat(week){
    return week.map(day => moment(day).format("DD.MM"));
}



function getMonthsFromIntervals(datesIntervals){
    let months = [];
    for (let i = 0; i < datesIntervals.length; i++){
        console.log(datesIntervals[i].from);
        months.push(moment(datesIntervals[i].from).locale("ru").format("MMM"));
    }
    return months;
}

function getDatesIntervals(){
    let datesIntervals = [];
    for (let i =0; i<12; i++){
        let dateInterval={from:{}, to:{}}
        dateInterval.from = moment().subtract(i,'month').startOf("month").format("YYYY-MM-DD");
        dateInterval.to = moment().subtract(i,'month').endOf("month").format("YYYY-MM-DD");
        datesIntervals.push(dateInterval);
    }
    return datesIntervals;
}

