import * as api from '../../api'
import Cookies from 'universal-cookie'
import { GOOGLE_LOGIN, LOGOUT } from '../types/auth.types'

const cookies = new Cookies()

export const googleLogin = (userData, isNickName, setNickName, setFormErrors) => async (dispath) => {
    try {
        const { data } = await api.googleLogin({ ...userData, isNickName})

        if (data.errors) {
            setFormErrors(data.errors)
        } if (data.continue) {
            setNickName(true)
        }
        if (data.token) {
            cookies.set('jwt_auth', data.token)
            
            dispath({
                type: GOOGLE_LOGIN,
                payload: data.user ? data.user : []
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const login = (formData, setFormErrors) => async (dispath) => {
    try {
        const { data } = await api.login(formData)

        if (data.errors) {
            setFormErrors(data.errors)
        } else {
            if (data.token) {
                cookies.set('jwt_auth', data.token)
        
                dispath({
                    type: GOOGLE_LOGIN,
                    payload: data.user ? data.user : []
                })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const register = (formData, setFormErrors) => async (dispath) => {
    try {
        if (formData.password === formData.confirmPassword) {
            delete formData.confirmPassword
            const { data } = await api.register(formData)

            if (data.errors) {
                setFormErrors(data.errors)
            } else {
                if (data.token) {
                    cookies.set('jwt_auth', data.token)
            
                    dispath({
                        type: GOOGLE_LOGIN,
                        payload: data.user ? data.user : []
                    })
                }
            }
        } else (
            setFormErrors({ confirmPassword: `Password don't matches` })
        )
    } catch (error) {
        console.log(error.message)
    }
}

export const logout = () => async (dispath) => {
    cookies.remove('jwt_auth')

    dispath({
        type: LOGOUT
    })
}