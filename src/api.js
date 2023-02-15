import axios from 'axios';

const skiverApiBaseUrl = axios.create({
    baseURL: 'http://localhost:9090/api'
})

export function getUsers() {
    return skiverApiBaseUrl
        .get('/users')
        .then((response) => {
            return response.data.users;
        })
}

export function registerUser(username, password) {
    return skiverApiBaseUrl
        .post('/users', {username, password})
        .then((response) => {
            return response;
        })
}