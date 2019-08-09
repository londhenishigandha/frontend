import React, { Component } from 'react'
import NewTrash from "../components/newTrash";
import DashboardComponent from '../components/dashboard'

 class Trash extends Component {
     constructor(props){
         super(props)
     }
    render() {
        console.log("Trash page Props", this.props);
        
        return (
            <div>
                <div className="container">
            <DashboardComponent
              listview={this.list_grid_view}
              getSearchNote={this.search}
              props={this.props} />
          </div>
          <div>
                <NewTrash
                props={this.props}
                />
                </div>
            </div>
        )
    }
}


export default Trash;