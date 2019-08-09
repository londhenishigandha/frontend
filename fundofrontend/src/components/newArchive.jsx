// import CreateNote from './createNote';
import React, { Component } from 'react'
import {  getArchiveNote } from '../services/noteService';
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


function searchingFor(search) {
    return function (x) {
        return x.title.includes(search) || x.content.includes(search)
    }
}


export default class NewArchive extends Component {
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
        getArchiveNote()
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
            <div >
                <DisplayCard
                allNotes={this.state.allNotes}
                ></DisplayCard>
            </div>
        )

    }
}
