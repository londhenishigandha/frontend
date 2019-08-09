import React, { Component } from 'react';
import { Popper, Paper, MenuItem, ClickAwayListener, InputBase } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import GetLabel from './getLabel';
import { createLabel } from '../services/labelService';


class MoreOptions extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            addLabel: false,
            labelName: ''
        }
    }

    handleDelete = (evt) => {

        try {
            console.log("Note ID: ", this.props.noteID)
            this.props.PropsToDelete(this.props.noteID);
            console.log(evt.target.value);

        } catch (err) {
            console.log("error in handle delete event", err);
        }
    }

    handleAddLabel = (evt) => {
        try {
            console.log("Note Id :", this.props.noteID)
            this.setState({ addLabel: !this.state.addLabel });
            console.log(evt.target.value);
        }
        catch (err) {
            console.log("error in add label ", err);
        }
    }

    handleClickAway = () => {
        this.setState({
            open: false
        })
    }

    handleCreateLabel = (e) => {
        alert("add")
        var data = {
            'label': this.state.labelName
        }

        console.log("new label", data);
        createLabel(data)
            .then(res => {
                console.log("New Label Created", res);
            }).catch(err => {
                console.log("error", err);
            })

    }

    handleChangeLabel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.labelName);

    }

    render() {
        return (
            <PopupState variant="popper" >
                {popupState => (
                    <div>
                        <div variant="contained" {...bindToggle(popupState)}>
                            <img src={require('../assets/images/moreOptionIcon.svg')}
                                onClick={this.clickMoreOptions}
                                alt="more options icon" />
                        </div>
                        <Popper {...bindPopper(popupState)} transition >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClickAway}><div>
                                     {!this.state.addLabel ?
                                      this.props.createNoteLabel
                                     ? 
                                      <div>
                                     <MenuItem onClick={this.handleAddLabel}>
                                         Add Label
                                          </MenuItem>
                                 </div>:

                                        <div>
                                            <MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
                                            <MenuItem onClick={this.handleAddLabel}>
                                                Add Label
                                                 </MenuItem>
                                        </div>
                                                    :
                                        <div>
                                            <div>
                                                <InputBase
                                                    onChange={this.handleChangeLabel}
                                                    value={this.state.labelName}
                                                    name="labelName"
                                                />
                                            </div>
                                            <div>
                                                <GetLabel
                                                    createLabelNote={"true"}
                                                    noteID={this.props.noteID} />
                                            </div>
                                            <div onClick={this.handleCreateLabel} style={{ cursor: "pointer" }}>
                                                <img src={require('../assets/images/add.svg')}
                                                    alt="add"
                                                />
                                                <span>Create</span> <span> {this.state.labelName}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                </ClickAwayListener>
                            </Paper>
                        </Popper>
                    </div>
                )}
            </PopupState>
        )
    }
}
export default MoreOptions;