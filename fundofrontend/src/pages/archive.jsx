import React, { Component } from 'react'
import NewArchive from "../components/newArchive";
import CreateNote from "../components/createNote"
import DashboardComponent from '../components/dashboard'

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state={
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
        console.log("Archive page Props", this.props);

        return (
            <div>
                <div className="container">
                    <DashboardComponent
                        listview={this.list_grid_view}
                        getSearchNote={this.search}
                        props={this.props} />
                </div>
                {/* <div>
                    <CreateNote></CreateNote>
                </div> */}
                <div>
                    <NewArchive
                        view={this.state.view}
                        search={this.state.search}
                        props={this.props} />
                </div>
            </div>
        )
    }
}


export default Archive;