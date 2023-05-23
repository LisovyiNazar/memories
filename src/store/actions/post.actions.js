import * as api from '../../api'
import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST } from '../types/posts.types'
import { SET_PAGINAION_DATA } from '../types/pagination.types'

export const getPosts = (page) => async (dispath) => {
    try {
        const { data } = await api.fetchPosts(page)
        
        dispath({
            type: FETCH_ALL_POSTS,
            payload: data ? data.items : []
        })

        dispath({
            type: SET_PAGINAION_DATA,
            payload: data ? data.pagination : {}
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserPosts = async (nickname, setUserPosts) => {
    try {
        const { data } = await api.fetchUserPosts(nickname)
        
        setUserPosts(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const getLikedPosts = async (nickname, setLikedPosts) => {
    try {
        const { data } = await api.fetchLikedPosts(nickname)
        
        setLikedPosts(data)
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispath) => {
    try {
        const { data } = await api.createPost(post)
        
        dispath({
            type: CREATE_POST,
            payload: data 
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, postData) => async (dispath) => {
    try {
        const { data } = await api.updatePost(id, postData)
        
        dispath({
            type: UPDATE_POST,
            payload: data 
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispath) => {
    try {
        const { data } = await api.deletePost(id)   
        
        dispath({
            type: DELETE_POST,
            payload: data 
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id, userId) => async (dispath) => {
    try {
        const { data } = await api.likePost(id, userId)   
        
        dispath({
            type: LIKE_POST,
            payload: data 
        })
    } catch (error) {
        console.log(error.message)
    }
}