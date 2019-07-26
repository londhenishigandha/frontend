import React, { Component } from 'react';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


class DrawerMenu extends Component {

    constructor() {
        super();

        this.state = {
            open: false,
            trash:""
   
        }
    }

    handleArchive = () => {
        console.log("drawer props", this.props);
        this.props.props.history.push('/archive');
    }
    
    handleReminder = () => {
        console.log("drawer props", this.props);
        this.props.props.history.push('/reminder');
    }
    
    handleTrash = () => {
        console.log("drawer props", this.props);
        this.props.props.history.push('/trash');
    }
    
    handleNote = () => {
        console.log("drawer props", this.props);
        this.props.props.history.push('/dashboard');
    }
    
        
    
    render() {
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={250}
                >
                    <div>
                    <MenuItem id="noteMenu" onClick={this.handleNote}>
                        <img src={require('../assets/images/note.svg')} alt="note icon"
                            style={{ marginRight: "40px" }} />
                        Notes
                    </MenuItem>
                    </div>
                   
                    <div>
                    <MenuItem id="reminderMenu" onClick={this.handleReminder}>
                        <img src={require('../assets/images/menuReminder.svg')} alt="reminder icon"
                            style={{ marginRight: "40px" }} />
                        Remainder
                    </MenuItem>
                    </div>

                    <div style={{ borderBottom: "1px solid lightgrey", borderTop: "1px solid lightgrey" }}>
                        <div style={{ marginRight: "218px", fontSize: "15px", marginBottom: "10px", marginTop: "10px", fontFamily: "arial" }}>
                            LABELS
                </div>

                        <div>
                          
                            <MenuItem >
                            

                                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                                    style={{ marginRight: "40px" }} />
                                Edit Labels
                            </MenuItem>
                        </div>

                    </div>
                    <div>

                    <MenuItem id="archiveMenu" onClick={this.handleArchive}>
                        <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                            style={{ marginRight: "40px" }} />
                        Archive
                    </MenuItem>
                    </div>

                    <div >

                    <MenuItem id="trashIcon"  onClick={this.handleTrash}>
                        <img src={require('../assets/images/menuTrash.svg')} alt="trash icon"
                            style={{ marginRight: "40px" }} />
                        Trash
                    </MenuItem>
                    </div>
                </Drawer>

               
            </div>
        )
    }
}

export default DrawerMenu;