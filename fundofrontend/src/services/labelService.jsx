import axios from 'axios';
export function createLabel(data) {
    return axios.post(`http://127.0.0.1:8000/label/`,data,  {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}

export function getAllLabel() {
    return axios.get(`http://127.0.0.1:8000/label/`,  {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}
export function deleteLabel(labelId) {
    return axios.delete(`http://127.0.0.1:8000/labels/${labelId}`,  {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}

export function updateLabel(data, labelId) {
    return axios.put(`http://127.0.0.1:8000/labels/${labelId}/`,data,  {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}