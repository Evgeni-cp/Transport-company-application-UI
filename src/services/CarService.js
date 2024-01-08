import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";


export const CarService = {
    getAllCars,
    getCarById,
    doTo1,
    doTo2,
    doKr,
    deleteCarById,
    updateCar,
    saveCar,
    partialUpdate
}

async function getAllCars(){
    return await HTTP.get("/api/cars", getHeaders()).then(
    (response)=>{
        return {status: response.status, cars: response.data};
    }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    });
}

async function getCarById(id){
    return await HTTP.get("/api/cars/"+id, getHeaders()).then(
        (response)=>{
            return {status: response.status, car: response.data};
        }).catch((error)=>{
        console.log(error.response);
        return {status: error.response.status};
    });
}

async function doTo1(id){
    return await HTTP.patch("api/cars/to-1/" + id, {}, getHeaders())
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.response);
        });
}

async function doTo2(id){
    return await HTTP.patch("api/cars/to-2/" + id, {}, getHeaders())
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.response);
        });
}

async function doKr(id){
    return await HTTP.patch("api/cars/kr/" + id, {}, getHeaders())
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error.response);
        });
}

async function deleteCarById(id){
    return await HTTP.delete("api/cars/" + id, getHeaders())
        .then(response => {
            return response.status;
        }).catch(error => {
            console.log(error.response);
        });
}

async function updateCar(updatedCar){
    return await HTTP.put("/api/cars", updatedCar, getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error => {
            console.log(error.response);
            return error.response;
        });
}

async function partialUpdate(carId, fieldsToUpdate){
    return await HTTP.patch("/api/cars/" + carId, fieldsToUpdate, getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error => {
            return error.response;
        });
}

async function saveCar(savedCar){
    return await HTTP.post("/api/cars", savedCar, getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error => {
            console.log(error.response);
            return error.response;
        });
}