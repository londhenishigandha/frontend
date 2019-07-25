import React, { Component } from 'react';
import { Popper, Paper, MenuItem, ClickAwayListener } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

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

    // open=()=>{
    // this.setState({open:!this.state.open})

    // }
    // handleEditor=(e)=>{
    // this.props.moreToEditorPorps(e.target.value,this.props.noteID)
    // console.log("more option editor value",e.target.value);


    // }

    // QuePropsToAllNotes = (value) => {
    //     this.setState({
    //         queAns: value
    //     })
    //     this.props.QuePropsToAllNotes(this.state.queAns)

    // }
    // handleIdToEditor=()=>{
    // this.props.IdtoEditor(this.props.noteID)
    // }

    // handleEditor = () => {
    //     this.props.propsToEditor()

    // }

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
                        <ClickAwayListener>
                            <Popper {...bindPopper(popupState)} transition >


                                <Paper>
                                    {
                                        !this.state.addLabel ?
                                            <div>
                                                <MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
                                                {/* <MenuItem onClick={this.handleAddLabel}>Add Label</MenuItem> */}
                                                {/* <MenuItem onClick={this.handleEditor}> */}
                                                    {/* Ask A Question</MenuItem> */}
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