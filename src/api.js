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

export function registerUser(username, password, profileImageUrl) {
    return skiverApiBaseUrl
        .post('/users', {username, password, profile_image_url: profileImageUrl || "https://skiver.co.uk/assets/images/avatars/avatar_image.png"})
        .then((response) => {
            return response;
        })
}

export function getPosts() {
    return skiverApiBaseUrl
        .get('/posts')
        .then((response) => {
            return response.data.posts;
        })
}

export function createAPost(username, body, likes, image_url, timestamp) {
    return skiverApiBaseUrl
        .post('/posts', {username, body, likes, image_url, timestamp})
        .then((response) => {
            return response;
        })
}