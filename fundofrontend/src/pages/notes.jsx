import React, { Component } from "react";
import Notes from '../components/notes'
class Note extends Component{
    render(){
        return (
            <div className="container">
              <Notes/>
            </div>
        );
    }
}
export default Note;