import React, { Component } from 'react';
import { Popper, Paper, MenuItem, ClickAwayListener } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CreateLabel from './createLabel';

class MoreOptions extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            addLabel: false,
           
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
    handleAddLabel() {
        this.setState({ addLabel: !this.state.addLabel });
    }

    handleClickAway =() => {
        this.setState({
            open: false
        })
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
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                            {/* to control a popper component */}
                            <Popper {...bindPopper(popupState)} transition >


                                <Paper>
                                    {
                                        !this.state.addLabel ?
                                            <div>
                                                <MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
                                                 {/* <MenuItem onClick={this.handleAddLabel}>Add Label</MenuItem> */}
                                                 <div>
                        <CreateLabel />
                    </div>
                                            </div>
                                            :
                                            <div>
                                                <textarea></textarea>
                                            </div>
                                    }



                                </Paper>


                            </Popper>
                        </ClickAwayListener>
                    </div>
                )}
            </PopupState>

        )

    }
}
export default MoreOptions;