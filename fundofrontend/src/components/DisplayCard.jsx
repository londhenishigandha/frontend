import React, { Component } from 'react'
import { archiveNote, unpinNote, setReminder, pinNote } from '../services/noteService';
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
                width: "288px",
                display: "flex",
                padding: "10px",
                overflow: "hidden",
                lineHeight: "39px",
                borderRadius: "12px",
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
            is_pin: false,
            search: [],
        }
    }

    handledelete = () => {
        console.log("Delete Reminder");

    }
    handledeletelabel = (labelname, noteID) => {
        console.log("Delete label", labelname , noteID);
        var data = {
            'id': noteID,
            'label': labelname,
        }


        console.log("Delete label", data);
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
                    this.props.displayCardToNotes(true)
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
                this.props.displayCardToNotes(true)
            })
            .catch(err => {
                console.log("Error", err);
            })
    }
    handleUnArchive = (noteId) => {
        var data = {
            'is_archive': false
        }

        console.log(data);
        
        updateNote(noteId,data)
            .then(response => {
                console.log("Unarchive succcessfylly .....", response);
                // this.props.displayCardToNotes(true)
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
                this.props.displayCardToNotes(true)
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
                console.log("Notes deleted successfully: ", response);
                this.props.displayCardToNotes(true)

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
                this.props.displayCardToNotes(true)
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
        this.props.displayCardToNotes(true)
    }

    handlePin = (noteId) => {
        var data = {
            'id': noteId,
            'is_pin': true
        }
        pinNote(data)
            .then(async response => {
                console.log("pin succcessfylly .....", response);
                await this.props.displayCardToNotes(true)
                // await this.props.displayCardToPinNotes(true)

            })
            .catch(err => {
                console.log("Error", err);
            })
    }
    handleUnPin = (noteId) => {
        var data = {
          
            'is_pin': false
        }
        updateNote(noteId,data)
            .then(async response => {
                console.log("Unpin succcessfylly .....", response);
                 await this.props.displayCardToNotes(true)
                // await this.props.displayCardToPinNotes(true)

            })
            .catch(err => {
                console.log("Error", err);
            })
    }
    moreOptionsToDisplayCard = (value) => {
        this.props.displayCardToNotes(value)
    }
    render() {
        console.log("display card", this.props.allNotes);

        const views = this.props.viewList ? "list" : null;
        const notes = this.props.allNotes.filter(searchingFor(this.props.searchNote)).map(key => {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Card className="Mainnotes"
                            style={{ backgroundColor: key.color, marginTop: "10px" }}
                            id={views}
                        >
                            <div style={{ width: "98%" }}>
                                <div className="pinnote">
                                    { key.is_pin ?
                                        <Tooltip title="unpin">
                                            <img src={require('../assets/images/pin1.svg')}
                                                alt="pin"
                                                onClick={() => this.handleUnPin(key.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Tooltip>
                                        :
                                        <Tooltip title="pin">
                                            <img src={require('../assets/images/unpin.svg')}
                                                alt="pin"
                                                onClick={() => this.handlePin(key.id)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </Tooltip>}
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
                                    <div style={{ display: 'flex', flexWrap: "wrap" }}>
                                        {key.label.map(labelkey => {
                                            return (<Chip
                                                size="small"
                                                label={labelkey}
                                                onDelete={() => this.handledeletelabel(labelkey, key.id)}
                                            />)
                                        }
                                        )}
                                    </div> : null
                                }
                                {(key.collaborate.length > 0) ?
                                    <div style={{ display: 'flex', flexWrap: "wrap" }}>
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
                                                CreateNoteToCollaborator={true}
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
                                         {  !key.is_archive ?
                                            <Tooltip title="Archive">
                                                <img src={require('../assets/images/archieve.svg')}
                                                    alt="Archieve"
                                                    onClick={() => this.handleArchive(key.id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </Tooltip>:
                                            <Tooltip title="UnArchive">
                                                <img src={require('../assets/images/unarchive.svg')}
                                                    alt="Archieve"
                                                    onClick={() => this.handleUnArchive(key.id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </Tooltip>
                                         }
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
                                                    noteID={key.id}
                                                    moreOptionsToDisplayCard={this.moreOptionsToDisplayCard}
                                                    AddLabel={true}
                                                >

                                                </MoreOptions>
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
                    {(key.id === this.state.noteId) &&
                        <Dialog
                            key={key.id}
                            open={this.state.modal}
                            onClose={this.handleClose}
                        >
                            <Card className="notes card-desc" style={{ backgroundColor: this.state.color, width: "96%" }} id={views} >
                                <div >
                                    <div className="pinnote">
                                        <Tooltip title="pin">
                                            <img src={require('../assets/images/unpin.svg')}
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
                                                CreateNoteToCollaborator={true}
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