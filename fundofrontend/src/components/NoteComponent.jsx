import React, { Component } from 'react'
import { getAllNotes } from '../services/noteService';
import DisplayCard from './DisplayCard';

export default class NoteComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allNotes:[]
        }
    }

    componentDidMount(){
        getAllNotes()
        .then(res => {
            this.setState({
                allNotes:res.data
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
                allNotes={this.state.allNotes}
                ></DisplayCard>
            </div>
        )
    }
}
