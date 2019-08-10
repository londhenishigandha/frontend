import React, { Component } from "react";
import NoteComponent from '../components/NoteComponent'
class Note extends Component{
    render(){
        return (
            <div className="container">
              <NoteComponent
              props={this.props}
              />
            </div>
        );
    }
}
export default Note;