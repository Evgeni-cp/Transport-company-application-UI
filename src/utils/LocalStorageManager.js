
export const LocalStorageManager = {
    getRefreshToken,
    setToken,
    removeToken,
    removeUser,
    getUser,
    isUserInLocalStorage
}

function getRefreshToken(){
    return getUser().refreshToken;
}
function removeToken(){
    let user = getUser();
    delete user.token;
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser(){
    return JSON.parse(localStorage.getItem("user"));
}

function setToken(token){
    let user = getUser();
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
}

function removeUser(){
    localStorage.clear();
}

function isUserInLocalStorage(){
    return localStorage.getItem("user") !== null;
}