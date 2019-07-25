import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { TextField, Button, Card } from '@material-ui/core';
import { userRegister } from '../services/userService'

class RegistrationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",                                
            password: "",

        }
    }


    handlefirstNameChange = event => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName })
    }
    handlelastNameChange = event => {
        const lastname = event.target.value;
        this.setState({ lastName: lastname })
    }
    handleusernameChange = event => {
        const userName = event.target.value;
        this.setState({ userName: userName })
    }
    handleemailChange = event => {
        const email = event.target.value;
        this.setState({ email: email })
    }
    handlepasswordChange = event => {
        const password = event.target.value;
        this.setState({ password: password })
    }

    // backend n frontend variables will match and then submit the data
    handleSubmit = () => {
        var data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password,
        }
        console.log(data);

        userRegister(data)
            .then(response => {
                console.log("register Response", response);
            })
            .catch(err => {
                console.log("Error in Registration", err);
            })
    }

    
    loginClick = () => {
        this.props.history.push('login')
    }

    render() {
        return (


            <div className="main">


                <Card className="card">
                    <div className="headingFundoo">Fundoo</div>
                    <div className="firstlast">
                        <div>
                            <div>

                                <TextField
                                    id="outlined-name"
                                    label="FirstName"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handlefirstNameChange}
                                    margin="normal"
                                    variant="outlined"

                                />
                            </div>

                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="LastName"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handlelastNameChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>

                        </div>

                        <div>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="UserName"
                                    type="email"
                                    autoComplete="email"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.handleusernameChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="email"
                                    type="email"
                                    autoComplete="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleemailChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div>

                            <div>

                                <TextField
                                    id="outlined-name"
                                    label="Password"
                                    type="password"
                                    autoComplete="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlepasswordChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>


                        </div>
                    </div>


                    <br></br>
                    {/* To submit the data by using onClick */}
                    <div className="btn">
                    <Button id="Reg_Button" onClick={this.handleSubmit}><b>REGISTER</b>
                        </Button>
                        <Button id="button"
                            onClick={this.loginClick}
                        > <b>Log in </b>
                        </Button>

                        


                    </div>


                </Card>



            </div>
        );
    }
}



export default withRouter(RegistrationComponent);


