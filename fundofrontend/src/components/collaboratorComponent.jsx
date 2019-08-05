import React, { Component } from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Dialog, DialogTitle, Paper,InputBase,Tooltip, DialogActions, Button, List, ListItem,ListItemText, searchText,Typography, DialogContent } from '@material-ui/core';
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
            searchText:'',
            userDetails: [],
            collaborators:[],
            suggetions: [],
            userList: [],

        }
    }


    componentDidMount() {
            getAllUsers()
            .then(response => {
                // console.log("All users list Collaborator", response.data);
                // console.log("componen 1111",response.data);
                
                let userArray = [];
                userArray = response.data.map(key => {
                    console.log("key ", key);
                    
                    
                    return key;
                })
                this.setState({
                    userList: userArray
                })
                // console.log("conponent did mount ", this.state.userList);

            })
            .catch(err => {
                console.log("error in collab : ", err);
            })

            // this.setState({
            //     collaborators: this.props.collaborators
            // })
    }

    closePopper = () => {
        this.setState({
            open: false
        })
    }
    // handleColor = (evt) => {
    //     try {
    //         // this.closePopper() ;
    //         console.log("Collaborator: ", this.props.noteID)
    //         this.props.toolsPropsToCollaborate(evt.target.value, this.props.noteID);
    //         console.log(evt.target.value);
    //     } catch (err) {
    //         console.log("error in handle color event");
    //     }
    // }

    handleToggle = () => {
        this.setState({ open: true });
        //this.props.handleToggle(!this.state.open)
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
     * render suggetion methos
     */

    renderSuggetions() {
        const { suggetions } = this.state;
        if (suggetions.length === 0) {
            return null
        }
        return (
            <Paper style={{height:"auto",maxHeight: "125px", overflow:"auto"}}>
                <List>
                    {suggetions.map((users) =>
                        users !== localStorage.getItem('email') &&
                        <ListItem onClick={() => this.handleSaveCollaborator(users)} key={users.userId}><ListItemText>{users}</ListItemText>
                        </ListItem>
                    )}
                </List>
            </Paper>
        )
    }



    handleSaveCollaborator (value){
            var data  = {
                'collaborate':value
            }
                addcollaboratorsNotes(data, this.props.noteID)
        
            .then((response) => {
                console.log("collab added successfully", response);
                this.setState({
                    searchText: ''      
                })
            })
            .catch(error => {
                console.log("err in collab", error);
            })
            }

    render() {
        const Fname = localStorage.getItem('first_name')
        const LName = localStorage.getItem('last_name')
        const Email = localStorage.getItem('email')
        const { searchText } = this.state;
        return (
            <div>
                {/* <img src={require('../assets/images/collaboratorIcon.svg')}
                          alt="collaborator"
                          onClick={this.handleCollaborotor()} /> */}
                <MuiThemeProvider theme={theme}>
                    <Tooltip title="Remind me">
                        <img src={require('../assets/images/collaboratorIcon.svg')}
                            className="collaborator"
                            onClick={this.handleToggle} alt="collaborator" />
                    </Tooltip>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                    >
                        {/* <div>
                             <InputBase
                                    type="text"
                                    multiline
                                    spellCheck={true}
                                    placeholder="Collaborator"
                                    value={this.state.collaborator}
                                    onChange={this.handleChangeEvent}
                                    onfocus=" "
                                    name="collaborator"
                                >
                                </InputBase>
                                </div> */}
                        <DialogTitle id="customized-dialog-title"style={{ borderBottom: "solid 1px lightgray", padding: "10px 24px" }} onClose={this.handleClose}>
                            Collaborator
                     </DialogTitle>
                        <DialogContent dividers>
                            
                                <div className="collaboratorcontent"
                                 style={{fontSize:'0.8rem', width:"100%"}}>
                               
                                    <b>{Fname + "  " + LName}</b>(Owner)<br></br>
                                    {Email}<br />
                                    <div style={{ display: "flex", flexDirection: "column", width:"100%" }}>
                                        <div className="collab-input-search-div">
                                            <InputBase
                                                type="text"
                                                placeholder="Person or email to share with"
                                                name="searchText"
                                                value={this.state.searchText}
                                                onChange={this.handleOnchange}
                                                style={{fontSize:'0.8rem', width:"100%"}}
                                            />
                                        </div>
                                    </div>

                                </div>
                                {this.renderSuggetions()}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
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
