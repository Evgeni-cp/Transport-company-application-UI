import {getHeaders} from "@/utils/AuthHeader";
import HTTP from "@/utils/HTTP";

export const UserService = {
    getAllUsers,
    deleteById,
    updateUser,
    saveUser,
    partialUpdate
}

async function getAllUsers(){
    return HTTP.get('/api/users', getHeaders()).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error.response);
    });
}

async function deleteById(userId){
    return HTTP.delete("/api/users/"+userId,getHeaders()).then(response => {
        return response.status;
    }).catch(error=>{
        console.log(error.response);
    });
}

async function updateUser(updatedUser){
    return await HTTP.put("/api/users", updatedUser, getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error => {
            console.log(error.response);
            return error.response;
        });
}

async function saveUser(user){
    return await HTTP.post('/api/users',user,getHeaders())
        .then(response => {
                console.log(response);
                return response;
            }
        ).catch(error => {
            console.log(error.response);
            return error.response;
        });
}

async function partialUpdate(userId, fieldsToUpdate){
    return await HTTP.patch('/api/users/'+ userId, fieldsToUpdate, getHeaders()).then(response=>{
        return response;
    }).catch(error =>{
        return error.response;
    })
}