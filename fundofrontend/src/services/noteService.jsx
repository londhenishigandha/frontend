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

export function updateNote(note_id, data) {
    return axios.put(`http://127.0.0.1:8000/notesview/${note_id}/`, data, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
  
    })
  }
  
  export function archiveNote(data) {
    return axios.put(`http://127.0.0.1:8000/archive/${data.id}/`, data, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
    
      })
  }
  
  export function unarchive(data) {
    return axios.put(`http://127.0.0.1:8000/unarchive/${data.id}/`, data, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
    
      })
  }
  export function getArchiveNote() {
    return axios.get(`http://127.0.0.1:8000/archive/`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
    
      })
  }

export function uploadImages(data){
  return axios.s3_upload(`http://127.0.0.1:8000/s3uploads/`,data, {
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
  console.log("Noote ",data);
  
  return axios.delete('http://127.0.0.1:8000/notesview/'+data, {

    headers: {
      "Authorization": localStorage.getItem("token")
    }

  })
  
}

export function setReminder(data, id){
  return axios.put(`http://127.0.0.1:8000/reminder/${id}/`, data,{
      headers: {
          "Authorization": localStorage.getItem("token")
      }
  })
}
export function getReminder(){
  return axios.get(`http://127.0.0.1:8000/reminder/`,{
      headers: {
          "Authorization": localStorage.getItem("token")
      }
  })
}

export function trash(){
  return axios.get('http://127.0.0.1:8000/trash/',{
      headers: {
          "Authorization": localStorage.getItem("token")
      }
  })
}

export function addcollaboratorsNotes(data, noteId){
  return axios.put(`http://127.0.0.1:8000/collaborator/${noteId}/`, data, {
      headers: {
          "Authorization": localStorage.getItem("token")
      }
  })
}

export function getPinnedNotes() {
  return axios.get(`http://127.0.0.1:8000/pin/`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
  
    })
}
export function pinNote(data) {
  return axios.put(`http://127.0.0.1:8000/pin/${data.id}/`, data, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
  
    })
}
export function unpinNote(data) {
  return axios.put(`http://127.0.0.1:8000/unpin/${data.id}/`, data, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
  
    })
}
