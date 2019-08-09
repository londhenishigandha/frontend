import React, { Component } from 'react'
import NewReminder from "../components/ReminderNew";
import DashboardComponent from '../components/dashboard'
import CreateNote from '../components/createNote'

class Reminder extends Component {
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
                        props={this.props}
                    />
                </div>
            </div>
          )
        
    
    }
}


export default Reminder;