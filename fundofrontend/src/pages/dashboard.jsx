import React, { Component } from "react";
import DashboardComponent from "../components/dashboard";
//import { withRouter } from 'react-router-dom'
import CreateNote from "../components/createNote";
import Notes from '../components/notes'
// import createNote from "../components/createNote";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      search: ""

    }
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
  render() {
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
            <CreateNote></CreateNote>
          </div>
          <div>
            <Notes
              view={this.state.view}
              search={this.state.search}
              props ={this.props}
            ></Notes>
          </div>
        </div>
      )
    }
  }
}
export default Dashboard;