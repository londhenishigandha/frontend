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
    return axios.put(`http://127.0.0.1:8000/archieve/${data.id}/`, data, {
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

