import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { MenuItem, Paper, Tooltip, ListItem, createMuiTheme, MuiThemeProvider, ClickAwayListener } from '@material-ui/core'
import { updateNote } from '../services/noteService';
const theme = createMuiTheme({
    overrides: {
        MuiMenuItem: {
            root: {
                borderbottomrightradius: 0,
                bordertoprightradius: 0,
                height: "13px",
                marginTop: "8px",
                marginBottom: "8px",
                width: "268px",
                fontSize: "12px",
            }
        },
        MuiPaper:{
            root:{
                zIndex:"1"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})


class SetReminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
    };
    
    handleClick = placement => event => {
        try{
        const { currentTarget } = event;

        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    }catch(err){
        console.log("error in handle click");
        
    }
    };
    handleClose=()=>{
        this.setState(state=>({open:!state.open}))
    }
    setTodayReminder =()=> {
        // try{
        var date = new Date()
        var d = date.getDate()
        var m = date.getMonth()+1
        var y = date.getFullYear()
        var hh= date.getHours();
        var mm = date.getMinutes();
        
        console.log("Today",d,m,y);
        
        var todayReminder = y+"-"+m+"-"+d+"T8:00:00.000000Z"
        console.log("date   ",todayReminder);
        
        console.log("Today",todayReminder);
        var data = {
                'reminder': todayReminder
        }
        console.log("id=================",this.props.noteID);
        this.props.toolsPropsToReminder(todayReminder, this.props.noteID);

        // updateNote(this.props.noteID, data)
        // .then(res => {
        //     console.log("reminder response", res);
            
        // })
        // .catch(err =>{
        //     console.log("error in reminder", err);
            
        // })
        // }
        // catch(err){
        //     console.log(err);
            
        // }
    }

    setTomorrowReminder =()=> {
        
        var date = new Date()
        var d = date.getDate()
        var m = date.getMonth()+1
        var y = date.getFullYear()
        var hh= date.getHours();
        var mm = date.getMinutes();
        
        console.log("Today",d,m,y);
        
        var tomorrowReminder = y+"-"+m+"-"+(d+1)+"T8:00:00.000000Z"
        console.log("date   ",tomorrowReminder);
        
        console.log("Today",tomorrowReminder);
        var data = {
                'reminder': tomorrowReminder
        }
        console.log("id=================",this.props.noteID);
        this.props.toolsPropsToReminder(tomorrowReminder, this.props.noteID);
        // updateNote(this.props.noteID, data)
        // .then(res => {
        //     console.log("reminder response", res);
            
        // })
        // .catch(err =>{
        //     console.log("error in reminder", err);
            
        // })
        // }
        // catch(err){
        //     console.log(err);
            
        // }
    }


    render() {
        const setAMPM = this.props.parentToolsProps;
        const { anchorEl, open, placement } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Tooltip title="Remind me">
                    <img src={require('../assets/images/reminderIcon.svg')}
                        className="reminderIcon" 
                        onClick={this.handleClick('bottom-start')} alt="remider icon" />
                    </Tooltip>

                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{zIndex:1}}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper id="reminderPopper">
                                <ClickAwayListener onClickAway={this.handleClose}>

                                    <div>
                                        <ListItem className="listRemindr" >Reminder:</ListItem>
                                        <MenuItem className="currentDate" onClick={()=>this.setTodayReminder(this.props.note)}>
                                            <div>Today</div>
                                            <div>8:00 {setAMPM}</div>
                                        </MenuItem>

                                        <MenuItem className="currentDate"  onClick={()=>this.setTomorrowReminder(this.props.note)}>
                                            <div>Tomorrow</div>
                                            <div>8:00 AM</div>
                                        </MenuItem>

                                    </div>
                                    </ClickAwayListener>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>



                </div>
            </MuiThemeProvider>
        )
    }
}
export default SetReminder;
