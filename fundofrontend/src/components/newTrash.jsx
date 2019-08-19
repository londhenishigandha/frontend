// import CreateNote from './createNote';
import React, { Component } from 'react'
import {  trash } from '../services/noteService';
import DisplayCard from './DisplayCard';
import { createMuiTheme } from '@material-ui/core'


const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                'width': "288px",
                "display": "flex",
                "padding": "10px",
                "overflow": "hidden",
                "margin-top": "76px",
                "line-height": "58px",
                "border-radius": "12px",
            }
        }

    }
})

export default class NewTrash extends Component {
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
        trash()
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
