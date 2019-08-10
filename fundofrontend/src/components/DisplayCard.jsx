import React, { Component } from 'react'
import { getAllNotes, archiveNote, setReminder } from '../services/noteService';
import { updateNote, deleteNote } from '../services/noteService';
import { Chip, Card, InputBase, Dialog, Button, Tooltip } from '@material-ui/core';
import ColorPallete from './colorPalette';
import MoreOptions from './moreOptions'
import Collaborator from './collaboratorComponent'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import SetReminder from './setReminder'

const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                'width': "288px",
                "display": "flex",
                "padding": "10px",
                "overflow": "hidden",
                // "margin-top": "76px",
                "line-height": "39px",
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


export default class DisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            open: false,
            title: '',
            content: '',
            noteId: '',
            modal: false,
            isArchived: false,
            color: '',
            reminder: '',
            search: [],
        }
    }

    // it executed after first render 
    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        // get all notes which define in noteservices
        getAllNotes()
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

    handledelete = () => {
        console.log("Delete Reminder");

    }
    handledeletelabel = () => {
        console.log("Delete label");

    }

    handleToggleOpen = (id, oldTitle, oldContent) => {
        // to set state
        this.setState({
            modal: !this.state.modal,
            noteId: id,
            title: oldTitle,
            content: oldContent
        });
        console.log("id ......", id);
        console.log("note id ......", this.state.noteId);
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    handleChangeEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // to submit the data
    handleSubmit = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }))
        if (this.state.modal) {
            var data = {
                'id': this.state.noteId,
                'title': this.state.title,
                'content': this.state.content
            }
            // for Update the note
            updateNote(data)
                .then(response => {
                    console.log("update note function", response);
                    this.getNotes();
                })
                .catch(err => {
                    console.log("Eroorrrrrr....", err);
                })
        }
    }
    // for archive
    handleArchive = (noteId) => {
        var data = {
            'id': noteId,
            'is_archive': true
        }
        archiveNote(data)
            .then(response => {
                console.log("Archive succcessfylly .....", response);
                // to get the nodes
                this.getNotes();
            })
            .catch(err => {
                console.log("Error", err);
            })
    }
    // For color
    handleColor = (value, noteId) => {
        console.log("Value in handlecolor", value);

        this.setState({
            color: value
        })
        console.log(this.state.color)
        var data = {
            'color': value
        }
        // update the note 
        updateNote(noteId, data)
            .then(response => {
                console.log("update note function", response);
                // this.getUpdateNotes();
                this.getNotes();
            })
            .catch(err => {
                console.log("Eroorrrrrr....", err);
            })
    }

    handleDelete = (noteId) => {
        var data = {
            'id': noteId,
            'is_deleted': true

        }
        // delete note
        deleteNote(noteId)
            .then(response => {
                console.log("Response from backend: ", response);
                this.getNotes();

            })
            .catch(err => {
                console.log("Error in delete notes", err);

            })
    }

    handlereminder = (reminderdate, noteId) => {
        alert(reminderdate)
        this.setState({
            reminder: reminderdate,
        })
        console.log("remainder ==> ", this.state.reminder);
        var data = {
            'id': noteId,
            'reminder': reminderdate,

        }
        // To set reminder
        setReminder(data, noteId)
            .then(response => {
                console.log("reminder response", response)

            })
            .catch(err => {
                console.log(err);

            })


    }
    handleDeleteReminder = (noteId) => {
        var data = {
            'noteIdList': [noteId],
            'reminder': ""
        }
    }
    saveCollaborator = (value) => {

    }

    render() {
        const views = this.props.view ? "list" : null
        const notes = this.props.allNotes.map(key => {
            return (
                <div>   
                    <MuiThemeProvider theme={theme}>
                        <Card className="Mainnotes"
                            style={{ backgroundColor: key.color,marginTop:"10px" }}
                            id={views}
                        >
                            <div style={{width:"98%"}}>
                                <div className="pinnote">
                                    <Tooltip title="pin">
                                        <img src={require('../assets/images/pin.png')}
                                            alt="pin"
                                        />
                                    </Tooltip>
                                </div>
                                <InputBase className="noteiinput"
                                    multiline
                                    spellCheck={true}
                                    onClick={() => this.handleToggleOpen(key.id, key.title, key.content)}
                                    value={key.title}
                                    readOnly
                                    style={{ backgroundColor: key.color }}

                                >
                                </InputBase>
                                <InputBase className="noteiinputcontent"
                                    multiline
                                    spellCheck={true}
                                    onClick={() => this.handleToggleOpen(key.id, key.title, key.content)}
                                    value={key.content}
                                    readOnly
                                    style={{ backgroundColor: key.color }}
                                >
                                </InputBase>
                                <div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={this.handledelete}
                                        />
                                        : null}
                                </div>
                                {/* Add a chip to labels */}
                                {(key.label.length > 0) ?
                                    <div style={{ display: 'flex',flexWrap:"wrap" }}>
                                        {key.label.map(labelkey => {

                                            return (<Chip
                                                size="small"
                                                label={labelkey}
                                                onDelete={this.handledeletelabel}
                                                className="Labelchip"
                                            />)
                                        }
                                        )}
                                    </div> : null
                                }
                                {(key.collaborate.length > 0) ?
                                    <div style={{ display: 'flex',flexWrap:"wrap" }}>
                                        {key.collaborate.map(collaborate => {

                                            return (<Chip
                                                size="small"
                                                label={collaborate}
                                                onDelete={this.handledeletelabel}
                                                className="collaboratorchip"
                                            />)
                                        }
                                        )}
                                    </div> : null
                                }

                                <div className="IconBottom"
                                    style={{ backgroundColor: key.color }}
                                >
                                    <div className="iconAdjustt">
                                                                            {/* For reminder */}
                                    <div>
                                        <Tooltip title="reminder">
                                            <SetReminder
                                                toolsPropsToReminder={this.handlereminder}
                                                noteID={key.id}>
                                            </SetReminder>

                                        </Tooltip>
                                    </div>
                                    <div>
                                        {/* For collaborator */}
                                        <Collaborator
                                            saveCollaborator={this.saveCollaborator}
                                            noteID={key.id}
                                            collaboratorUser={key.collaborate}
                                        ></Collaborator>
                                    </div>
                                    <div>
                                        <Tooltip title="Change color">
                                            <ColorPallete className="color"
                                                toolsPropsToColorpallete={this.handleColor}
                                                noteID={key.id}
                                            ></ColorPallete>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Archive">
                                            <img src={require('../assets/images/archieve.svg')}
                                                alt="Archieve"
                                                onClick={() => this.handleArchive(key.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Add Image">
                                            <img src={require('../assets/images/addImageIcon.svg')}
                                                alt="Add image"
                                            />
                                        </Tooltip>
                                    </div>

                                    <div>
                                        <Tooltip title="More">
                                            <MoreOptions
                                                PropsToDelete={this.handleDelete}
                                                noteID={key.id}></MoreOptions>
                                        </Tooltip>
                                    </div>
                                    </div>

                                    <div>
                                        <Tooltip title="Close">
                                            <Button onClick={this.handleSubmit}><b>Close</b></Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </MuiThemeProvider>
                    {(key.id === this.state.noteId) ?
                        <Dialog
                            key={key.id}
                            open={this.state.modal}
                            onClose={this.handleClose}

                        >

                            <Card className="notes card-desc" style={{ backgroundColor: this.state.color }} id={views} >


                                <div >
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

                                    <div className="IconBottom"
                                    >
                                         <div>
                                        <Tooltip title="reminder">
                                            <SetReminder
                                                toolsPropsToReminder={this.handlereminder}
                                                noteID={key.id}>
                                            </SetReminder>

                                        </Tooltip>
                                    </div>
                                        <div>
                                        {/* For collaborator */}
                                        <Collaborator
                                            saveCollaborator={this.saveCollaborator}
                                            noteID={key.id}
                                            collaboratorUser={key.collaborate}
                                        ></Collaborator>
                                    </div>
                                        <div>
                                            <ColorPallete
                                                toolsPropsToColorpallete={this.handleColor}
                                                noteID={key.id}
                                            ></ColorPallete>
                                        </div>
                                        <div>
                                            <Tooltip title="Archive">
                                                <img src={require('../assets/images/archieve.svg')}
                                                    alt="Archieve"
                                                    onClick={() => this.handleArchive(key.id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip title="Add Image">
                                                <img src={require('../assets/images/addImageIcon.svg')}
                                                    alt="Add image"
                                                />
                                            </Tooltip>
                                        </div>

                                        <div>
                                            <Tooltip title="More">
                                                <MoreOptions
                                                    PropsToDelete={this.handleDelete}
                                                    noteID={key.id}></MoreOptions>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip title="Close">
                                                <Button onClick={this.handleSubmit}><b>Close</b></Button>
                                            </Tooltip>
                                        </div>
                                    </div>

                                </div>
                            </Card>

                        </Dialog>
                        :
                        null
                    }

                </div>
            )
        })
        return (
            <div>
                <div className="allNotes">
                    {notes}
                </div>
            </div>
        )
    }
};