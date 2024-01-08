import HTTP from "@/utils/HTTP";
import {getHeaders} from "@/utils/AuthHeader";

export const RoleService = {
    getAllRoles
}

async function getAllRoles(){
    return HTTP.get("/api/roles", getHeaders()).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error.response);
    });
}