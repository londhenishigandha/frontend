import React, { Component } from 'react'
import { getAllNotes, getPinnedNotes } from '../services/noteService';
import DisplayCard from './DisplayCard';
import NewPinned from './newPinned';

export default class NoteComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allNotes: [],
            pinnedNotes:[],
            ispinned : false
        }
        this.displayCard = this.displayCard.bind(this);
    }

    async componentDidMount() {
        await this.getNotes();
    }

    getNotes = () => {
        getAllNotes()
            .then(res => {
                var allNotesArray = [];
                for (let i = res.data.length - 1; i >= 0; i--) {
                    allNotesArray.push(res.data[i])
                }
                this.setState({ allNotes: allNotesArray })
                // console.log("this data", this.state.allNotes);
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    


    displayCard(newNote) {
        console.log("display card==>", newNote);
        var allNotesArray = [];
        allNotesArray = this.state.allNotes;
        allNotesArray.unshift(newNote);
        this.setState({
            allNotes: allNotesArray
        })
        this.getNotes();
        

    }
    
    displayCardToNotes = (value) => {
        if(value){
            this.getNotes();
            this.props.NoteToPages(value)
        }
    }

    render() {
        return (
            <div>
                <h4>Others</h4>
                <DisplayCard
                    viewList={this.props.view}
                    allNotes={this.state.allNotes}
                    searchNote={this.props.search}
                    displayCardToNotes={this.displayCardToNotes}
                ></DisplayCard>
            </div>
        )
    }
}
