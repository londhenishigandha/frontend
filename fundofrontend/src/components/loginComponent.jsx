import React, { Component } from 'react'
import { TextField, Button, Card } from '@material-ui/core';
import { userLogin } from '../services/userService';
import { withRouter } from 'react-router-dom'

class LoginComponent extends Component {
    constructor(props) {
        //This will initiate the parent's constructor method and allow the component to inherit the method from Reacr.Component
        super(props);
        this.state = {
            userName: "",
            password: "",
        }
    }


    handlemailChange = event => {
        const userName = event.target.value;
        this.setState({ userName: userName })
    }

    handlepasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password })
    }

    // here submit the data of username and password
    handleSubmit = () => {
        let data = {
            username: this.state.userName,
            password: this.state.password,
        }
        console.log('login done ===>', data);
        userLogin(data)
        .then((response => {
            console.log("login response",response);
            var token = response.data.result.jwt_token
            console.log(token);
            localStorage.setItem('token', token)
            localStorage.setItem('token1', true);
            localStorage.setItem('first_name', response.data.result.first_name);
            localStorage.setItem('last_name', response.data.result.last_name)
            localStorage.setItem('email', response.data.result.email)
            console.log('login done', response)
            this.props.history.push('dashboard')
            
        }))
        .catch((err => {
            console.log(err);

        }))

    }

    forgotClick = () => {
        this.props.history.push('forgot')
    }
    registerClick = () => {
        this.props.history.push('registration')
    }
    //is the method that actual outputs HTML to the DOM.
    render() {
        return (
            <Card className="card">
                <div className="FundooLogin">Login Page</div>
                <div className="loginMain">
                    {/* textfield for username */}
                    <div>
                        <TextField className="un"
                            id="outlined-name"
                            label="UserName"
                            type="email"
                            autoComplete="email"
                            name="userName"
                            value={this.state.email}
                            onChange={this.handlemailChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    {/* textfield for password */}
                    <div>
                        <TextField className="passworrd"
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
                </div>

                {/* on click to submit the details */}
                <div className="bt">

                    <Button id="Button" onClick={this.handleSubmit}>Log in</Button>
                    </div>
                    <div> 
                    <Button id="forgot_Button" onClick={this.forgotClick}><b>Forget password</b>
                    </Button>
                   
                    <Button id="Reg_Button" onClick={this.registerClick}><b>Register</b>
                    </Button>
                    </div>
                
                <br></br>


            </Card>
        );
    }
}

export default withRouter(LoginComponent);