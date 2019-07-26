import React, { Component } from 'react'
import ReminderComponent from "../components/reminderComponent";
import DashboardComponent from '../components/dashboard'

 class Reminder extends Component {
    render() {
        return (
            <div>
                <div className="container">
            <DashboardComponent
              listview={this.list_grid_view}
              getSearchNote={this.search}
              props ={this.props} />
          </div>
          <div>
                <ReminderComponent
                props ={this.props}
                />
                </div>
            </div>
        )
    }
}


export default Reminder;