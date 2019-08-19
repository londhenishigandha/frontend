import React, { Component } from 'react'
import NewPinned from '../components/newPinned';
import createNote from '../components/createNote';
import DashboardComponent from '../components/dashboard';

export default class PinNotes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             search:""
        }
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
              props={this.props}/>
          </div>
          <div>
            <createNote
            getNewNote={this.getNewNote}
            />
          </div>
          <div>
            <NewPinned
             view={this.state.view}
             search={this.state.search}
             props={this.props}
             ref={this.noteToCards}/>
          </div>
            </div>
        )
    }
}
