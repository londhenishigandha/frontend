// import CreateNote from './createNote';
import React, { Component } from 'react'
import { getPinnedNotes } from '../services/noteService';
import DisplayCard from './DisplayCard';

export default class NewPinned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            pinnedNotes:[]
        }
    }

    componentDidMount() {
        this.getPinnedNotes();
    }

    getPinnedNotes = () => {
        getPinnedNotes()
            .then(async res => {
                var allNotesArray = [];
                for (let i = res.data.length - 1; i >= 0; i--) {
                    allNotesArray.push(res.data[i])
                }
                await this.setState({ pinnedNotes: allNotesArray })

            })
            .catch(err => {
                console.log("error", err);
            })
    }

    displayCardToNotes = (value) => {
        if (value) {
            this.getPinnedNotes();
        }
    }
    render() {
        if(this.props.isPinned){
            this.getPinnedNotes();
        }
        console.log("pinned ", this.state.pinnedNotes);
        
        return (
            <div >
                <h4>
                    Pinned Notes
                </h4>
                <DisplayCard
                    viewList={this.props.view}
                    allNotes={this.state.pinnedNotes}
                    searchNote={this.props.search} 
                    pinnedNotes={true} 
                    displayCardToNotes = {this.displayCardToNotes}             
                    ></DisplayCard>
            </div>
        )

    }
}
