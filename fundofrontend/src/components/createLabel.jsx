import React, { Component } from 'react'
import { InputBase, Dialog, Tooltip } from '@material-ui/core';
import { createLabel } from '../services/labelService';
import GetLabel from './getLabel';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    overrides:{
        MuiDialog:{
            paperWidthSm:{
                width:"300px",
                height:"300px"
            }
        }
    }
})


class CreateLabel extends Component {
    constructor(props){
        super(props);
        this.state = {
            open:'',
            label:''
        }
    }

    handleClickOpen = () => {
        this.setState({
            open:!this.state.open
        })
    }

    handleClose = () => {
        // to set state
        this.setState({
            open:false
        })
    }
    handleChange = (e) => {
        // to set state
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    // to handle create label
    handleCreateLabel = () => {
        var data = {
            'label':this.state.label
        }
        // call create label from labelServices
        createLabel(data)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log("error", err);
            
        })
    }
    render() {
        return (
            <div>
                {/* for edit label */}
                <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>
                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                      />
                    Edit Labels 
                </div>
                <MuiThemeProvider theme={theme}>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    <div  style={{padding:"4%"}}>
                        
                        <InputBase 
                        placeholder="Create label"
                        onChange={this.handleChange}
                        name="label"
                        />
                        <Tooltip title="Create label">
                        <img src={require('../assets/images/check.svg')} 
                        alt="Create label"
                        onClick={this.handleCreateLabel}
                        />
                        </Tooltip>
                    </div>
                    <div style={{padding:"4%"}}>
                        <GetLabel />
                    </div>
                    
                </Dialog>
                </MuiThemeProvider>
                
            </div>

        )
    }
}

export default CreateLabel