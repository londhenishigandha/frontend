import React, { Component } from 'react'
import { TextField, Button, Card } from '@material-ui/core';
import { resetpassword } from '../services/userService';
import { withRouter } from 'react-router-dom'

class ResetPasswordComponent extends Component {
    constructor(props) {
        //This will initiate the parent's constructor method and alowsw the component to inherit the method from Reacr.Component
        super(props);
        this.state = {
            password: "",
            confirm_password: "",
        }
    }


    
    handlepasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password })
    }
    handleconfirm_passwordChange = event => {
        const confirm_password = event.target.value;
        this.setState({ confirm_password: confirm_password })
    }

    // here submit the data of username and password
    handleSubmit = () => {
        var current_site = window.location.pathname
        var url = current_site.substring(15)
        alert(url)
        let data = {
            password: this.state.password,
            confirm_password: this.state.confirm_password,
        }
        console.log('password reset done ===>', data);
        resetpassword(data,url)

    }
    resetPass = () => {
        this.props.history.push('reset')
    }
    //is the method that actual outputs HTML to the DOM.
    render() {
        return (
            <Card className="card">
                <div className="FundooLogin">Reset password</div>
                <div className="loginMain">
                   {/* textfield for password */}
                    <div>
                        <TextField className="password"
                            id="outlined-name"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handlepasswordChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField className="pass"
                            id="outlined-name"
                            label="confirm_password"
                            type="confirm_password"
                            autoComplete="confirm_password"
                            name="confirm_password"
                            value={this.state.confirm_password}
                            onChange={this.handleconfirm_passwordChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </div>

                {/* on click to submit the details */}
                <div className="bt">

                    <Button id="Button" onClick={this.handleSubmit}>Submit
                    </Button>
                </div>
                <br></br>


            </Card>
        );
    }
}

export default withRouter(ResetPasswordComponent);