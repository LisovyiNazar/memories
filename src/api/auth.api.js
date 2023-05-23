import axios from 'axios'

export const googleLogin = (userData) => axios.post('https://memories-api-rs27.onrender.com/auth/google-login', userData)
export const login = (userData) => axios.post('https://memories-api-rs27.onrender.com/auth/login', userData)
export const register = (userData) => axios.post('https://memories-api-rs27.onrender.com/auth/register', userData)