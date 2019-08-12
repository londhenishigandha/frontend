import React, { Component } from 'react'
import NewReminder from "../components/ReminderNew";
import DashboardComponent from '../components/dashboard'
import CreateNote from '../components/createNote'

class Reminder extends Component {
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
                    <NewReminder
                       view={this.state.view}
                       search={this.state.search}
                       props={this.props}
                    />
                </div>
            </div>
          )
        
    
    }
}


export default Reminder;