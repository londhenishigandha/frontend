import axios from 'axios';


export function userNotes(data) {
    return axios.post(`http://127.0.0.1:8000/notes/`, data, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}

export function getAllNotes() {
    return axios.get(`http://127.0.0.1:8000/notes/`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }

    })
}

export function updateNote(data) {
    return axios.put(`http://127.0.0.1:8000/notesview/${data.id}/`, data, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
  
    })
  }

  export function archiveNote(data) {
    return axios.put(`http://127.0.0.1:8000/archieve/${data.id}/`, data, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
    
      })
  }

export function updateImages(data){
  return axios.put(`http://127.0.0.1:8000/notes/`,data, {
      headers: {
          "Authorization": localStorage.getItem("token")
      }

  })
}


export function colorChange(data) {
  return axios.post('http://127.0.0.1:8000/notes/', data, {

    headers: {
      "Authorization": localStorage.getItem("token")
    }

  })
  
}
export function deleteNote(data) {
  return axios.post('http://127.0.0.1:8000/notes/', data, {

    headers: {
      "Authorization": localStorage.getItem("token")
    }

  })
  
}