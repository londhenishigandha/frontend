import React, { Component } from 'react';
import { IconButton, Popper, Tooltip, Card, ClickAwayListener, Paper } from '@material-ui/core';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';


const hexCodesAndNames =
    [{ name: "lightcoral", hexCode: "#f28b81" },
    { name: "lavender", hexCode: "#e8eaed" },
    { name: "orange", hexCode: "#f7bc02" },
    { name: "green", hexCode: "#ccff8f" },
    { name: "yellow", hexCode: "#fcf475" },
    { name: "paleturquoise", hexCode: "#a7ffeb" },
    { name: "lightcyan", hexCode: "#cbf0f8" },
    { name: "lightblue", hexCode: "#aecbfa" },
    { name: "plum", hexCode: "#d7aefb" },
    { name: "wheat", hexCode: "#e6c9a8" },
    { name: "mistyrose", hexCode: "#fbcfe8" },
    { name: "white", hexCode: "#ffffff" }
    ]
class ColorPallete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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
            console.log("Color Component 37: ", this.props.noteID)
            this.props.toolsPropsToColorpallete(evt.target.value, this.props.noteID);
            console.log(evt.target.value);
        } catch (err) {
            console.log("error in handle color event");
        }
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }
    render() {

        const changeCardColor = hexCodesAndNames.map((colorKey) =>
            <Tooltip title={colorKey.name} key={colorKey.hexCode}>
                <IconButton style={{ backgroundColor: colorKey.hexCode, "margin": "2px", }}
                    value={colorKey.hexCode}
                    onClick={this.handleColor}

                >
                </IconButton>
            </Tooltip>
        );

        return (
            
            <PopupState variant="popper" >
                {popupState => (
                    <ClickAwayListener onClickAway={() => this.closePopper()}>
                    <div className="color">
                        
                        <div variant="contained" {...bindToggle(popupState)}>
                            <Tooltip title="Change Color">
                                <img src={require('../assets/images/color.svg')}
                                    alt="change color"
                                    onClick={this.handleToggle}
                                />  
                            </Tooltip>
                        </div>
                        
                        <Popper  {...bindPopper(popupState)} transition className="colorPopper" >

                            {this.state.open ?
                                <Paper
                                     style={{display:"flex", flexWrap:"wrap", width:"30%", marginLeft:"20%", marginTop:"-1%"}}>
                                    {changeCardColor}

                                </Paper>
                                : null}
                        </Popper>
                    </div>
                    </ClickAwayListener>
                )}
            </PopupState>

        )
    }
}
export default ColorPallete;
