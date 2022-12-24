import Axios from "../../Axios";

export const postUserRegister = (userData) => Axios.post('/user-register' , userData)

export const postUserLogin = (userData) => Axios.post('/user-login' , userData)
