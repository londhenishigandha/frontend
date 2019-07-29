// import CreateNote from './createNote';
import React, { Component } from 'react'
import { getAllNotes, archiveNote } from '../services/noteService';
import { updateNote, colorChange, deleteNote } from '../services/noteService';
import { Card, InputBase, Dialog, Button, Tooltip } from '@material-ui/core';
import ColorPallete from './colorPalette';
import MoreOptions from '../components/moreOptions'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'


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


export default class ArchiveComponent extends Component {
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
            color: "",
            search: [],
        }
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
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

    handleToggleOpen = (id, oldTitle, oldContent) => {
        // it checks for the previous state
        this.setState({
            modal: !this.state.modal,
            NoteId: id,
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
                    this.getUpdateNotes();
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
                console.log("Archive successfully .....", response);
                // to get the nodes
                this.getNotes();
            })
            .catch(err => {
                console.log("Err0r", err);
            })
    }

    handleColor = (noteId, value) => {
        console.log("Value in handlecolor", value);

        this.setState({
            color: value
        })
        console.log(this.state.color)

        var data = {
            'id': noteId,
            'color': value

        }
        // deleteNote(data)
        //     .then(response => {
        //         console.log("Response from backend", response);


        //     })
        //     .catch(err => {
        //         console.log("Error at color notes", err);
        //     })
    }
    handleDelete = (noteId) => {
        var data = {
            'id': noteId,
            'is_deleted': true

        }
        deleteNote(data)
            .then(response => {
                console.log("Response from backend: ", response);
                this.getNotes();

            })
            .catch(err => {
                console.log("Error in delete notes", err);

            })


    }

    render() {
        const views = this.props.view ? "list" : null
        const notes = this.state.allNotes.map(key => {
            return (
            (key.is_archive === true)&&
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Card className="Mainnotes"
                            style={{ backgroundColor: key.color }}
                            id={views}
                        >

                            <div>

                                <InputBase className="noteiinput"
                                    multiline
                                    spellCheck={true}
                                    onClick={() => this.handleToggleOpen(key.id, key.title, key.content)}
                                    value={key.title}
                                    readOnly
                                    style={{ backgroundColor: key.color }}

                                >
                                </InputBase>
                                <InputBase className="noteiinput"
                                    multiline
                                    spellCheck={true}
                                    onClick={() => this.handleToggleOpen(key.id, key.title, key.content)}
                                    value={key.content}
                                    readOnly
                                    style={{ backgroundColor: key.color }}
                                >
                                </InputBase>
                                <div className="IconBottom"
                                    style={{ backgroundColor: key.color }}
                                >
                                    <div>
                                        <Tooltip title="reminder">
                                            <img src={require('../assets/images/reminderIcon.svg')}
                                                alt="reminder"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Collaborator">
                                            <img src={require('../assets/images/collaboratorIcon.svg')}
                                                alt="collaborator"
                                            />
                                        </Tooltip>
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
                    </MuiThemeProvider>
                    {(key.id === this.state.noteId) ?
                        <Dialog
                            key={key.id}
                            open={this.state.modal}
                            onClose={this.handleClose}
                            aria-labelledby="responsive-dialog-title"
                            className="dialog-bottom-icons"
                        >

                            <Card className="notes card-desc" style={{ backgroundColor: this.state.color }} >


                                <div>
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
                                </div>

                                <div className="IconBottom">
                                    <div>
                                        <Tooltip title="Reminder">
                                            <img src={require('../assets/images/reminderIcon.svg')}
                                                alt="reminder"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Collaborator">
                                            <img src={require('../assets/images/collaboratorIcon.svg')}
                                                alt="collaborator"
                                            />
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Color">
                                            <img src={require('../assets/images/colorPalette.svg')}
                                                alt="Color"
                                                onClick={() => this.handleColor}
                                                style={{ cursor: "pointer" }}
                                            />
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
                                                alt="Add Image"
                                            />
                                        </Tooltip>
                                    </div>

                                    <div>
                                        <Tooltip title="More">

                                            <MoreOptions
                                                PropsToDelete={this.handleDelete}></MoreOptions>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Close">
                                            <Button onClick={this.handleSubmit}><b>Close</b></Button>
                                        </Tooltip>
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
}
