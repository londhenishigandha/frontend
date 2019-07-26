import React, { Component } from "react";
import Notes from '../components/notes'
class Note extends Component{
    render(){
        return (
            <div className="container">
              <Notes
              props = {this.props}
              />
            </div>
        );
    }
}
export default Note;