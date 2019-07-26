import React, { Component } from 'react'
import TrashComponent from "../components/trashComponent";
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
              props ={this.props} />
          </div>
          <div>
                <TrashComponent
                props ={this.props}
                />
                </div>
            </div>
        )
    }
}


export default Trash;