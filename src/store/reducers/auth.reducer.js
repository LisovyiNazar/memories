import { GOOGLE_LOGIN, LOGOUT } from '../types/auth.types'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'

const cookies = new Cookies()

const authDefaultState = {
    authenticate: false,
    user: null
}

const jwtAuthCookie = cookies.get('jwt_auth')
const authState = jwtAuthCookie ? {authenticate: true, user: jwt(jwtAuthCookie)} : authDefaultState

const authReduser = (state = authState, action) => {
    switch (action.type) {
        case GOOGLE_LOGIN:
            return {
                authenticate: true,
                user: action.payload
            }
        case LOGOUT:
            return authDefaultState
        default:
            return state
    }
}

export default authReduser