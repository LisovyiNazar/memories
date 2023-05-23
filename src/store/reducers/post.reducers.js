import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST } from '../types/posts.types'

const postsReduser = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload
        case CREATE_POST:
            return [...state, action.payload]
        case UPDATE_POST:
        case LIKE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.id)
        default:
            return state
    }
}

export default postsReduser