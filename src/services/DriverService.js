import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const DriverService = {
    getFreeDrivers,
    getAllDrivers,
    deleteById,
    update,
    save,
    partialUpdate
}

async function partialUpdate(carId, updatedFields){
    return await HTTP.patch('api/drivers/'+carId, updatedFields, getHeaders()).then(response=>{
        return response;
    }).catch(error=>{
        return error.response;
    });
}

async function getFreeDrivers(){
    return await HTTP.get("/api/drivers/free", getHeaders()).then(response => {
        return response;
    }).catch(error => {
        console.log(error.response)
    });
}

async function getAllDrivers(){
    return await HTTP.get("/api/drivers/", getHeaders()).then(response => {
        return response.data;
    }).catch(error=>{
        console.log(error.response)
    });
}

async function deleteById(id){
    return await HTTP.delete('api/drivers/'+id,getHeaders()).then(response=>{
        return response;
    }).catch(error=>{
        return error.response;
    });
}

async function update(driver){
    return await HTTP.put('api/drivers', driver, getHeaders()).then(response=>{
        return response;
    }).catch(error=>{
        return error.response;
    });
}

async function save(driver){
    return await HTTP.post('api/drivers', driver, getHeaders()).then(response=>{
        return response;
    }).catch(error=>{
        return error.response;
    });
}