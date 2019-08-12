import React, { Component } from 'react'
import { Card, InputBase, Button, Tooltip } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { userNotes } from '../services/noteService';
import { withRouter } from 'react-router-dom'
import ColorPallete from './colorPalette';
import MoreOptions from './moreOptions';
import SetReminder from '../components/setReminder'
import Collaborator from '../components/collaboratorComponent'



const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                display: "flex",
                width: 461,     
                marginTop: "76px",
                lineHeight: "58px",
                borderRadius: "12px",
                padding: "10px"
            }
        }

    }
})

// class to create note
class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            note: [],
            title: "",
            content: "",
            label: "",
            created_by: "",
            image: "",
            is_trash: "",
            is_archieve: "",
            is_pin: "",
            color: '',
            reminder: null,
            searchText:'',
            newNote : []
        }
        // To bind
        this.handleColor = this.handleColor.bind(this);
        this.handlereminder = this.handlereminder.bind(this);
    }
    handleNotes = () => {
        this.setState({
            openNote: !this.state.openNote,
            content: '',
            title: '',
        })
    }

    handleNotesClose = () => {
        this.setState({
            openNote: false
        })
    }


    handleChangeEvent = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    HandleCreated_byChange = (event) => {
        const created_by = event.target.value;
        this.setState({
            created_by: created_by
        })
    }
    HandleChange = (event) => {
        const is_trash = event.target.value;
        this.setState({
            is_trash: is_trash
        })
    }
    handleColor(value) {

        console.log("color", value);

        this.setState({
            color: value
        })
    }

    handlereminder(value) {

        console.log("reminder set", value);
        this.setState({
            reminder: value
        })
    }

    // for archive
    handleArchive(value) {

        this.setState({
            is_archieve: value
        })
    }
    handlePin(value) {
        // const is_pin = event.target.value;
        this.setState({
            is_pin: value
        })
    }


    handlecreatelabel(value) {

        console.log("label", value);

        this.setState({
            label: value
        })
    }

    // To submit
    handleSubmit = () => {
        this.setState({
            openNote: !this.state.openNote,
            title: '',
            content: ''
        })
        var data = {
            'content': this.state.content,
            'title': this.state.title,
            'color': this.state.color,
            'reminder': this.state.reminder,
            // 'collaborate': [this.state.searchText]
        }
        console.log('data in note create ==>', data);



        // user notes from user services will check 
        userNotes(data)
            .then(response => {
                console.log('data in note create @@@@@@@==>', data);
                console.log('note created', response.data);
                this.setState({ newNote: response.data })
                this.props.getNewNote(this.state.newNote);
            })
            .catch(err => {
                console.log("Error in note creation", err);
            })
    }

    moreOptionsToCreateNote = (labelId) => {
        this.setState({
            label: labelId
        })
    }

    searchTextToCreateNote =  async(searchText) => {
        await this.setState({
            searchText:searchText
        })
        console.log(this.state.searchText);
        
    }


    render() {
        return (!this.state.openNote ?
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                {/* card for note */}
                <MuiThemeProvider theme={theme}>
                    <Card className="Mainnotes"  >
                        <div className="Notemainnn">
                            <div onClick={this.handleNotes}>
                                <InputBase className="noteiinput"
                                    multiline
                                    placeholder="Take a Note....."
                                >
                                </InputBase>
                            </div>
                        </div>
                    </Card>
                </MuiThemeProvider>

            </div>
            :
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Card className="notes card-desc" style={{ backgroundColor: this.state.color }} >

                            <div className="Notemainnn">
                                <div>
                                    {/* For pin icon */}
                                    <div className="pinnote">
                                        <Tooltip title="pin">
                                            <img src={require('../assets/images/pin.png')}
                                                alt="pin"
                                            />
                                        </Tooltip>
                                    </div>
                                    <InputBase className="noteinput"

                                        type="text"

                                        multiline
                                        spellCheck={true}
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={this.handleChangeEvent}
                                        onfocus=" "
                                        name="title"
                                    >
                                    </InputBase>
                                </div>

                                <div>
                                    {/* For Content */}
                                    <InputBase className="noteinputcontent"
                                        type="text"

                                        multiline
                                        spellCheck={true}
                                        placeholder="Take a Note....."
                                        value={this.state.content}
                                        onChange={this.handleChangeEvent}
                                        onfocus=" "
                                        name="content">
                                    </InputBase>
                                </div>
                                <div>
                                    {this.state.reminder}
                                </div>
                                <div className="IconBottom">
                                    <div>
                                        {/* To set reminder */}
                                        <Tooltip title="reminder">
                                            <SetReminder
                                                toolsPropsToReminder={this.handlereminder}
                                                noteID=''
                                            >
                                            </SetReminder>

                                        </Tooltip>
                                    </div>
                                    {/* To set collaborator  */}
                                        <Collaborator
                                        searchTextToCreateNote = {this.searchTextToCreateNote}
                                        createNoteToCollaborator={true}
                                        />
                                    {/* To set or change the color of notes */}
                                    <div>
                                        <ColorPallete
                                            toolsPropsToColorpallete={this.handleColor}
                                            noteID=''
                                        />
                                    </div >
                                    {/* To archive the notes */}
                                    <div>
                                        <Tooltip title="Archive">
                                            <img src={require('../assets/images/archieve.svg')}
                                                alt="Archieve"
                                            />
                                        </Tooltip>
                                    </div>
                                    {/* To add image */}
                                    <div>
                                        <Tooltip title="Add image">
                                            <img src={require('../assets/images/addImageIcon.svg')}
                                                alt="Add Image"
                                            />
                                        </Tooltip>
                                    </div>
                                    {/* for more options */}
                                    <div>
                                        <Tooltip title="More">
                                            <MoreOptions
                                                toolsPropsTocreatelabel={this.handlecreatelabel}
                                                noteID={''}
                                                moreOptionsToCreateNote={this.moreOptionsToCreateNote}
                                                createNoteLabel={"true"}
                                            ></MoreOptions>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        {/* To close */}
                                        <Tooltip title="Close">
                                            <Button onClick={this.handleSubmit}><b>Close</b></Button>
                                        </Tooltip>
                                    </div>

                                </div>

                            </div>

                        </Card>
                    </MuiThemeProvider>
                </div>
            </div>



        )
    }
}
export default withRouter(CreateNote);