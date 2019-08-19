import React, { Component } from 'react'

import { createMuiTheme, MuiThemeProvider, Avatar } from '@material-ui/core'
import { Dialog, DialogTitle, Paper, InputBase, Tooltip, DialogActions, Button, List, ListItem, ListItemText, DialogContent } from '@material-ui/core';
import { getAllUsers } from '../services/userService';
import { addcollaboratorsNotes } from '../services/noteService';

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
        },
        MuiDialog: {
            paperWidthSm: {
                width: "500px",
                maxHeight: "500px",
                borderRadius: "10px"
            }
        }

    }
})


export default class Collaborator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            collaborator: '',
            open: false,
            searchText: '',
            userDetails: [],
            collaborators: [],
            suggetions: [],
            userList: [],
            user: ''

        }
    }

    componentDidMount() {
        getAllUsers()
            .then(response => {
                let userArray = [];
                userArray = response.data.map(key => {
                    console.log("key", key);
                    return key;
                })
                this.setState({
                    userList: userArray
                })
            })
            .catch(err => {
                console.log("error in collaborate : ", err);
            })
    }

    closePopper = () => {
        this.setState({
            open: false
        })
    }

    handleToggle = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChangeEvent = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnchange = (e) => {
        console.log("User List", this.state.userList);
        const value = e.target.value;
        let suggetions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggetions = this.state.userList.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
            suggetions, searchText: value
        }))
    }
    handleCollaborotor = (evt) => {
        try {
            console.log("collaborate: ", this.props.noteID)
            this.props.toolsPropsToCollaborate(evt.target.value, this.props.noteID);
            console.log(evt.target.value);
        } catch (err) {
            console.log("error in handle color event");
        }
    }
    /**
     * render suggetion method
     */
    renderSuggetions() {
        const { suggetions } = this.state;
        if (suggetions.length === 0) {
            return null
        }
        return (
            <Paper style={{ height: "auto", maxHeight: "125px", overflow: "auto" }}>
                <List>
                    {suggetions.map((users) =>
                        users !== localStorage.getItem('email') &&
                        <ListItem onClick={() => this.suggetionSelected(users)} key={users.userId}>
                            <ListItemText>{users}</ListItemText>
                        </ListItem>
                    )}
                </List>
            </Paper>
        )
    }

    suggetionSelected = async (value) => {
        this.setState(() => ({
            searchText: value,
            suggetions: [],
        }))
    }

    handleSaveCollaborator = () => {
        console.log(this.state.searchText);
        if (this.props.createNoteToCollaborator) {
            this.props.searchTextToCreateNote(this.state.searchText)
            this.setState({
                searchText: '',
                open: false,
            })
        } else {
            var data = {
                'collaborate': this.state.searchText
            }
            addcollaboratorsNotes(data, this.props.noteID)

                .then(async (response) => {
                    console.log("collab added successfully", response);
                    await this.props.saveCollaborator(true)
                    this.setState({
                        searchText: '',
                        open: false,
                    })
                })
                .catch(error => {
                    console.log("err in collab", error);
                })
        }

    }

    render() {
        const Fname = localStorage.getItem('first_name')
        const LName = localStorage.getItem('last_name')
        const Email = localStorage.getItem('email')
        console.log("sdadasdsadasd", this.props.collaboratedUsers);
        var users = ''
        if (this.props.CreateNoteToCollaborator) {
            users = this.props.collaboratorUser.map((users) =>
                users !== localStorage.getItem('email') &&
                <div style={{ display: "flex" }}>
                    <Avatar><span style={{ alignSelf: "center" }}>
                    {(users).toString().substring(0, 1).toUpperCase()}</span>
                    </Avatar>
                    <div style={{ alignSelf: "cen9ter", padding: "2%" }}>{users}</div>
                </div>
            )
        }
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Tooltip title="collaborate">
                        <img src={require('../assets/images/collaboratorIcon.svg')}
                            className="collaborator"
                            onClick={this.handleToggle} alt="collaborator" />
                    </Tooltip>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}

                    >
                        <DialogTitle id="customized-dialog-title" style={{ borderBottom: "solid 1px lightgray", padding: "10px 24px" }} onClose={this.handleClose}>
                            Collaborator
                     </DialogTitle>
                        <DialogContent>
                            <div className="collaboratorcontent"
                                style={{ fontSize: '0.8rem', width: "100%" }}>
                                <div collborateimage>
                                    <div className="profileupload">
                                        <img className="profilewidth"
                                            src={`https://fundoo-bucket.s3-us-west-2.amazonaws.com/${Fname}.jpg`}
                                            alt="Profile Pic" />
                                    </div>
                                    <div className="usernamenlastname">
                                        <b>{Fname + "  " + LName}</b>(Owner)<br></br>
                                        {Email}<br />
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogContent>
                            {users}
                        </DialogContent>
                        <DialogContent>
                            <div style={{ display: "flex", width: "100%" }}>
                                <Avatar>
                                    <img className="collabwidth" style={{}}
                                        src={require('../assets/images/collaborator1.svg')}
                                        alt="collaborate Pic" />
                                </Avatar>
                                <InputBase
                                    type="text"
                                    placeholder="Person or email to share with"
                                    name="searchText"
                                    value={this.state.searchText}
                                    onChange={this.handleOnchange}
                                    style={{ fontSize: '0.8rem', width: "100%", padding: "2%" }}
                                />
                            </div>
                            {this.renderSuggetions()}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleSaveCollaborator} color="primary">
                                Save
            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
            </Button>
                        </DialogActions>

                    </Dialog>

                </MuiThemeProvider>
            </div>

        )

    }

}
