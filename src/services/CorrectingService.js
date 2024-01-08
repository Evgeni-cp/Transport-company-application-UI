import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const CorrectingService = {
    getCorrectingData,
    updateCorrectingData
}

async function getCorrectingData(){
    return await HTTP.get("/api/correcting", getHeaders()).then(
        (response)=>{
            return {correctingData: response.data};
        }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    });
}

async function updateCorrectingData(correctingData) {
    return await HTTP.post("/api/correcting", correctingData, getHeaders()).then(
        (response)=>{
            return {correctingData: response.data};
        }).catch((error)=> {
        console.log(error.response);
        return {status: error.response.status};
    });
}