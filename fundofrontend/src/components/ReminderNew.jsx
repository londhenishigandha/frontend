// import CreateNote from './createNote';
import React, { Component } from 'react'
import { getReminder } from '../services/noteService';
import DisplayCard from './DisplayCard';
import { createMuiTheme } from '@material-ui/core'


export default class NewReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        getReminder()
            .then(response => {
                console.log("reponse", response.data);
                this.setState({
                    allNotes: response.data
                })
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    render() {
        return (
            <div>
                <DisplayCard
                    viewList={this.props.view}
                    allNotes={this.state.allNotes}
                    searchNote={this.props.search}               
                     ></DisplayCard>
            </div>
        )

    }
}
