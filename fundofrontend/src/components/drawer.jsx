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
    
        
    
    render() {
        return (
            <div>
                <Drawer
                    variant="persistent"
                    open={this.props.appBarProps}
                    width={250}
                >
                    <div>
                    <MenuItem id="noteMenu" >
                        <img src={require('../assets/images/note.svg')} alt="note icon"
                            style={{ marginRight: "40px" }} />
                        Notes
                    </MenuItem>
                    </div>
                   
                    <div>
                    <MenuItem id="reminderMenu" >
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
                          
                            <MenuItem>
                            

                                <img src={require('../assets/images/menuEdit.svg')} alt="edit icon"
                                    style={{ marginRight: "40px" }} />
                                Edit Labels
                            </MenuItem>
                        </div>

                    </div>
                    <div>

                    <MenuItem id="archiveMenu" >
                        <img src={require('../assets/images/menuArchive.svg')} alt="archive icon"
                            style={{ marginRight: "40px" }} />
                        Archive
                    </MenuItem>
                    </div>

                    <div onClick={this.handleTrash}>

                    <MenuItem id="trashIcon"  >
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