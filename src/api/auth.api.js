import axios from 'axios'

export const googleLogin = (userData) => axios.post('/auth/google-login', userData)
export const login = (userData) => axios.post('/auth/login', userData)
export const register = (userData) => axios.post('/auth/register', userData)