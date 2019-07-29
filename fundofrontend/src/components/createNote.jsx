import React, { Component } from 'react'
import { Card, InputBase, Button, Tooltip } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { userNotes } from '../services/noteService';
import { withRouter } from 'react-router-dom'
import ColorPallete from './colorPalette';
import MoreOptions from './moreOptions';
import Reminder from './reminderComponent'

const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                display: "flex",
                width: "350px",
                "margin-top": "76px",
                "line-height": "58px",
                // "margin-left": "477px",
                "border-radius": "12px",
                padding: "10px"
            }
        }

    }
})


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
            color:''
        }

        this.handleColor = this.handleColor.bind(this);
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
        // const color = event.target.value;
        console.log("color", value);
        
        this.setState({
            color: value
        })
    }

    handleArchive(value) {
        // const is_archieve = event.target.value;
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


    handleSubmit = () => {
        this.setState({
            openNote: !this.state.openNote,
            title:'',
            content: ''
        })
        var data = {
            'content': this.state.content,
            'title': this.state.title,
            'color': this.state.color
        }
        console.log('data in note create ==>', data);

        userNotes(data)
            .then(response => {
                console.log('data in note create @@@@@@@==>', data);
                console.log('note created', response);
                
            })
            .catch(err => {
                console.log("Error in note creation", err);
            })
    }


    render() {
        return (!this.state.openNote ?
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <MuiThemeProvider theme={theme}>
                    <Card className="Mainnotes"  >
                        <div className="Notemainnn">
                            <div  onClick={this.handleNotes}>
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
                <MuiThemeProvider theme={theme}>
                    <Card className="notes card-desc" style={{ backgroundColor: this.state.color }} >

                        <div className="Notemainnn">
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
                               <ColorPallete 
                                 toolsPropsToColorpallete={this.handleColor}
                                 noteID = ''
                               />
                                </div>
                                <div>
                                <Tooltip title="Archive"> 
                                    <img src={require('../assets/images/archieve.svg')}
                                        alt="Archieve"
                                    />
                                </Tooltip>
                                </div>
                                <div>
                                <Tooltip title="Add image"> 
                                    <img src={require('../assets/images/addImageIcon.svg')}
                                        alt="Add Image"
                                    />
                                </Tooltip>
                                </div>
                               
                                <div>
                                <Tooltip title="More"> 
                                <MoreOptions
                                                PropsToDelete={this.handleDelete}
                                                noteID=''></MoreOptions>
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
            </div>



        )
    }
}
export default withRouter(CreateNote);