import axios from "axios";
import {SERVER_URL} from "@/utils/Properties";
import {LocalStorageManager} from "@/utils/LocalStorageManager";
import {getHeaders} from "@/utils/AuthHeader";
import router from "@/utils/Router";

let HTTP = axios.create({
    baseURL: SERVER_URL
});

HTTP.interceptors.response.use((config)=>{
    return config;
}, error => {

    const originalRequest = error.config;
    if(error.response.status === 401 && error.response.data.message === "Full authentication is required to access this resource"){
            if(!LocalStorageManager.isUserInLocalStorage()){
                return router.push({path:"/login"});
            }
            LocalStorageManager.removeToken();
            axios.post(SERVER_URL + "/api/auth/refresh", {refreshToken: LocalStorageManager.getRefreshToken()}, getHeaders())
                .then(result=>{
                    LocalStorageManager.setToken(result.data.token)
                    originalRequest.headers = getHeaders().headers;
                    return HTTP.request(originalRequest);
                })
                .catch(()=>{
                    LocalStorageManager.removeUser();
                    return router.push({path:"/login"});
                });
    }
    throw error;
})

export default HTTP;

