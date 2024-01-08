export function getHeaders() {
    let user = JSON.parse(localStorage.getItem('user'));

    let config = {};
    if (user && user.token) {
        config.headers= { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token };
    } else {
        config.headers = {'Content-Type': 'application/json'};
    }
    return config;
}