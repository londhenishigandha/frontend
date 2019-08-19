import React, { Component } from "react";
import DashboardComponent from "../components/dashboard";
import CreateNote from "../components/createNote";
import NoteComponent from "../components/NoteComponent";
import NewPinned from "../components/newPinned";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      view: false,
      search: "",
      isPinned:false

    }

    this.noteToCards = React.createRef();

  }
  list_grid_view = (value) => {
    this.setState({
      view: !value
    })
  }

  search = (value) => {
    this.setState({
      search: value

    })

  }

  NoteToPages = (value) => {
    this.setState({
      isPinned: value

    })
  }

 getNewNote = (newNote) => {
        console.log("newnote==>", newNote);
        this.noteToCards.current.displayCard(newNote);
    }
  render() {
    console.log("Token",localStorage.getItem('token1'));
    
    if (localStorage.getItem('token1') !== "true") {
      return (
        window.location.href = 'login'
      )
    }
    else {
      return (
        <div>
          <div className="container">
            <DashboardComponent
              listview={this.list_grid_view}
              getSearchNote={this.search} 
              props={this.props}/>
          </div>
          <div>
            <CreateNote
            getNewNote={this.getNewNote}
            ></CreateNote>
          </div>

          <NewPinned
            view={this.state.view}
            search={this.state.search}
           props={this.props}
           isPinned={this.state.isPinned}
          />
          <div>
            <NoteComponent
             view={this.state.view}
             search={this.state.search}
             props={this.props}
             ref={this.noteToCards}
             NoteToPages={this.NoteToPages}></NoteComponent>
          </div>
        </div>
      )
    }
  }
}
export default Dashboard;