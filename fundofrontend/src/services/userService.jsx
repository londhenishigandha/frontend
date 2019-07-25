import axios from 'axios';

export function userRegister(data) {
    return axios.post(`register/`, data)

}
export function userLogin(data) {

    return axios.post(`http://127.0.0.1:8000/fundoonote/user_login/`, data)
        
}

export function userForgot(data) {
    return axios.post(`http://127.0.0.1:8000/forgot/`, data)
}

export function resetpassword(data,url) {
    alert(`http://127.0.0.1:8000/`+url)
    return axios.post(`http://127.0.0.1:8000/`+url, data)
}
