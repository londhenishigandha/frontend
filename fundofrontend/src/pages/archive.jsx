import React, { Component } from 'react'
import NewArchive from "../components/newArchive";
import CreateNote from "../components/createNote"
import DashboardComponent from '../components/dashboard'

 class Archive extends Component {
     constructor(props){
         super(props)
     }
    render() {
        console.log("Archive page Props", this.props);
        
        return (
            <div>
                <div className="container">
            <DashboardComponent
              listview={this.list_grid_view}
              getSearchNote={this.search}
              props={this.props} />
          </div>
          <div>
            <CreateNote></CreateNote>
          </div>
          <div>
                <NewArchive
                props={this.props}
                />
                </div>
            </div>
        )
    }
}


export default Archive;