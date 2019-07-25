import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import {TextField,Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { userForgot } from '../services/userService';
class ForgotComponent extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            email:"",
        }
    }
    handleEmailChange=event=>{
        const email=event.target.value;
        this.setState({email:email})
    }

      

    handleSubmit = event => {
    event.preventDefault();
    var data = {
        "email":this.state.email
    }    
    userForgot(data)
    }

    forgotClick = () => {
        this.props.history.push('forgot')
    }

    render()
    {
        return(

            <div className="main">
                <Card className="Fcard">
                    <div className="forgot"><b>Forgot Password</b></div>
                    <br></br>

            <div>
                <TextField className="email" 
                    id="outlined-name"
                    label="Enter Registered Email Id"
                    type="email"
                    autoComplete="email"
                    value={this.state.Email}
                    onChange={this.handleEmailChange}
                    margin="normal"
                    variant="outlined"
                />
            </div>
            
          
            
            <br></br>
            <div className="bt">
                <Button id="Reg_Button"   onClick={this.handleSubmit}><b>Send</b> </Button>
            </div>

            </Card>

            
            </div>
        
    );
    }
    
  }

  export default withRouter(ForgotComponent);