import axios from 'axios'

export const fetchPosts = (page) => axios.get(`/posts/${page}`)
export const fetchUserPosts = (nickname) => axios.get(`/posts/user/${nickname}`)
export const fetchLikedPosts = (nickname) => axios.get(`/posts/liked/user/${nickname}`)
export const createPost = (newPost) => axios.post('/posts', newPost)
export const updatePost = (id, postData) => axios.patch(`/posts/${id}`, postData)
export const deletePost = (id) => axios.delete(`/posts/${id}`)
export const likePost   = (id, userId) => axios.patch(`/posts/like/${id}`, {userId: userId})