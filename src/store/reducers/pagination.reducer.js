import { SET_PAGINAION_DATA } from '../types/pagination.types'

const paginationReduser = (state = {}, action) => {
    switch (action.type) {
        case SET_PAGINAION_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default paginationReduser