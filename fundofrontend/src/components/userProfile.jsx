import React, {Component} from 'react'
import {Tooltip, Button} from '@material-ui/core'
import { blue } from '@material-ui/core/colors';
import { ProfileUpload } from '../services/userService'
import userLogout from '../services/userService'
import { withRouter } from 'react-router-dom'

const UserLogout = userLogout 
const profileUpload = ProfileUpload
class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            open : false,
            file:null
        }
    }

    handleToggle = () =>{
        this.setState({
            open : !this.state.open
        })
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/login');
      };
    

  async handleProfilePic (event) {
        event.preventDefault();
        await this.setState({
            file:event.target.files[0]
        })
        console.log("====================",this.state.file);
        
        profileUpload(this.state.file).then(resp=>{
            console.log("Upload Success", resp.data)
        }).catch(err =>{
            console.log("Errrrrrrr ", err)
        })
    }

    render(){
        const Fname = localStorage.getItem('first_name')
        const LName = localStorage.getItem('last_name')
        const Email = localStorage.getItem('email')
        const username = localStorage.getItem('first_name')
        return(
                <div >
               
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event)=>this.handleProfilePic(event)}
                  style={{ display: "none" }}
                />
                
                <label htmlFor="contained-button-file">
                    <Tooltip title="Change">
                         <img className="profile width" 
                         src={'https://fundoo-bucket.s3-us-west-2.amazonaws.com/image'+username+'.jpg'} 
                         alt="Profile Pic" />
                    </Tooltip><br></br>
                </label>
                    <div className="profilecontent">   
                       {Email}<br/>
                       {Fname+"  "+LName}
                    </div>
                    <div className="Pcardbottom">
                        <Button style={{color:blue}} 
                                className="btnlogout" 
                                size="small" 
                                variant="outline" 
                                color="primary" 
                                onClick={this.handle}
                                >Add Account
                        </Button>
                        <Button style={{color:blue}}
                            className="btnlogout" 
                            size="small" 
                            variant="outline" 
                            color="primary" 
                            onClick={this.handleLogout}
                            > Logout 
                        </Button>

                    </div>
                     
                </div>
        )
    }
}

export default withRouter (UserProfile);