import axios from 'axios';

const skiverApiBaseUrl = axios.create({
    // baseURL: 'http://localhost:9090/api'
    baseURL: 'https://skiver.onrender.com/api'
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

export function getPostsByUsername(username) {
    return skiverApiBaseUrl
        .get(`/users/${username}/posts`)
        .then((response) => {
            return response.data.posts;
        })
}

export function getCommentsByPostId(postId) {
    return skiverApiBaseUrl
        .get(`/posts/${postId}/comments`)
        .then((response) => {
            return response.data.comments;
        })
}

export function getCommentsByUsername(username) {
    return skiverApiBaseUrl
        .get(`/users/${username}/comments`)
        .then((response) => {
            return response.data.comments;
        })
}

export function createAPost(username, body, likes, image_url, timestamp) {
    return skiverApiBaseUrl
        .post('/posts', {username, body, likes, image_url, timestamp})
        .then((response) => {
            return response;
        })
}

export function postComment(post_id, owner, body, timestamp) {
    return skiverApiBaseUrl
        .post('/comments', {post_id, owner, body, timestamp})
        .then((response) => {
            return response;
        })
}

export function editPost(postId, body, likes, image_url) {
    return skiverApiBaseUrl
        .patch(`/posts/${postId}`, {body, likes, image_url})
        .then((response) => {
            return response;
        })
}

export function editUserByUsername(username, profile_image_url) {
    return skiverApiBaseUrl
        .patch(`/users/${username}`, {profile_image_url})
        .then((response) => {
            return response;
        })
}

export function deletePost(postId) {
    return skiverApiBaseUrl
        .delete(`/posts/${postId}`)
        .then((response) => {
            return response;
        })
}

export function editComment(commentId, body) {
    return skiverApiBaseUrl
        .patch(`/comments/${commentId}`, {body})
        .then((response) => {
            return response;
        })
}

export function deleteComment(commentId) {
    return skiverApiBaseUrl
        .delete(`/comments/${commentId}`)
        .then((response) => {
            return response;
        })
}

export function deleteAllCommentsByPostId(postId) {
    return skiverApiBaseUrl
        .delete(`/posts/${postId}/comments`)
        .then((response) => {
            return response;
        })
}

export function deleteAllCommentsByUsername(username) {
    return skiverApiBaseUrl
        .delete(`/users/${username}/comments`)
        .then((response) => {
            return response;
        })
}

export function deleteUserByUsername(username) {
    return skiverApiBaseUrl
        .delete(`/users/${username}`)
        .then((response) => {
            return response;
        })
}

export function deleteAllPostsByUsername(username) {
    return skiverApiBaseUrl
        .delete(`/users/${username}/posts`)
        .then((response) => {
            return response;
        })
}

