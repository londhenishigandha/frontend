import React, { Component } from 'react'
import { InputBase, Dialog, Tooltip } from '@material-ui/core';
import { Check } from "@material-ui/icons/Check";
import { Close } from "@material-ui/icons/Close";
import { createLabel } from '../services/labelService';
import GetLabel from './getLabel';


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
        this.setState({
            open:false
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleCreateLabel = () => {
        var data = {
            'label':this.state.label
        }
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
                <div onClick={this.handleClickOpen} style={{ cursor: 'pointer' }}>
                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                      />
                    Edit Labels
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    <div>
                        
                        <InputBase 
                        placeholder="Create label"
                        onChange={this.handleChange}
                        name ="label"
                        />
                        <Tooltip title="Create label">
                        <img src={require('../assets/images/check.svg')} 
                        alt="Create label"
                        onClick={this.handleCreateLabel}
                        />
                        </Tooltip>
                    </div>
                    <div>
                        <GetLabel />
                    </div>
                </Dialog>
            </div>

        )
    }
}

export default CreateLabel