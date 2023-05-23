import { combineReducers } from 'redux'
import postsReduser from './post.reducers' 
import authReduser from './auth.reducer'
import paginationReduser from './pagination.reducer'

export default combineReducers({
    posts: postsReduser,
    auth: authReduser,
    pagination: paginationReduser
})