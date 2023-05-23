import axios from 'axios'

export const fetchPosts = (page) => axios.get(`https://memories-api-rs27.onrender.com/posts/${page}`)
export const fetchUserPosts = (nickname) => axios.get(`https://memories-api-rs27.onrender.com/posts/user/${nickname}`)
export const fetchLikedPosts = (nickname) => axios.get(`https://memories-api-rs27.onrender.com/posts/liked/user/${nickname}`)
export const createPost = (newPost) => axios.post('https://memories-api-rs27.onrender.com/posts', newPost)
export const updatePost = (id, postData) => axios.patch(`https://memories-api-rs27.onrender.composts/${id}`, postData)
export const deletePost = (id) => axios.delete(`https://memories-api-rs27.onrender.com/posts/${id}`)
export const likePost   = (id, userId) => axios.patch(`https://memories-api-rs27.onrender.com/posts/like/${id}`, {userId: userId})