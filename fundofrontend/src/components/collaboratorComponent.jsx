import React, { Component } from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { Dialog, DialogTitle, InputBase,Tooltip, DialogActions, Button, Typography, DialogContent } from '@material-ui/core';

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
            searchText:''

        }
    }

    closePopper = () => {
        this.setState({
            open: false
        })
    }
    handleColor = (evt) => {
        try {
            // this.closePopper() ;
            console.log("Collaborator: ", this.props.noteID)
            this.props.toolsPropsToCollaborate(evt.target.value, this.props.noteID);
            console.log(evt.target.value);
        } catch (err) {
            console.log("error in handle color event");
        }
    }

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

    handleOnchange=(e)=>{
        const value = e.state.value;
        this.state({
          searchText:value  
        })
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
                                                name="collabSearch"
                                                value={searchText}
                                                onChange={this.handleOnchange}
                                                style={{fontSize:'0.8rem', width:"100%"}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            
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
