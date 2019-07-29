import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme, Popover, Button, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withRouter } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '../components/drawer'

const thm = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        top: 70,
        width: 234,
        background: 'white'
      },
      paperAnchorDockedLeft: {
        borderColor: "white"
      },

    },
    MuiAppBar: {
      colorPrimary: {
        color: 'black',
        backgroundColor: 'lightgray'
      },
      root: {
        top: 0,
        left: 'auto',
      },
      InputRoot: {
        color: 'inherit',
      },
      positionStatic: {
        position: "fixed",
      }

    }
  }
});
class DashboardComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      listview:false,
      searchNote:""
    }
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  Logout = (e) => {
    console.log("logout", this.props.drop);

    localStorage.clear()
    this.props.history.push('dashboard')

  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login');
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  SearchHandle=(evt)=>{
    this.setState({ searchNote: evt.target.value })
    this.props.getSearchNote(evt.target.value)
  }

  handleRefresh = (event) => {
    window.location.reload();
    this.props.reloadprops(event.target.value)
  }
  handleview = (e) => {
    this.setState({
      listview: !this.state.listview
    })
    this.props.listview(this.state.listview)
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    console.log("dashboard props", this.props);
    
    return (
      <MuiThemeProvider theme={thm}>
        <div>
          <AppBar position="static" className="appBar">

            <Toolbar className="toolBar" >
              <IconButton color="inherit" aria-label="Open drawer" >
                <MenuIcon id="menu" onClick={this.handleToggle} />
              </IconButton>
              <img className="img" src={require('../assets/images/keep-512.png')} alt="keep icon" /><b>FundooNotes</b>
              <div className="iconAdjust">
                <div className="searchIcon">
                  <InputBase className="srch"
                    placeholder="Search…"
                    value={this.state.searchNote}
                    onChange={this.SearchHandle}

                  />
                  <div className="search">
                    <IconButton><SearchIcon>
                    </SearchIcon></IconButton>
                  </div>
                </div>
              </div>
              <div className="refresh">
                <IconButton onClick={this.handleRefresh}>
                  <RefreshIcon>

                  </RefreshIcon>
                </IconButton>

              </div>

              <div className="view">
                {!this.state.listview ?
                  <div>
                    <IconButton onClick={this.handleview}>
                      <img src={require('../assets/images/listView')} alt="list" />
                    </IconButton>

                  </div>

                  :
                  <div>
                    <IconButton onClick={this.handleview}>
                      <img src={require('../assets/images/gridview.png')} alt="grid" />
                    </IconButton>

                  </div>
                }
              </div>

              <div>
                <Tooltip

                  // title= "demo"
                  title=
                  {
                    <div>
                      <div>
                        <span>{localStorage.getItem('first_name')}</span> <span> {localStorage.getItem('last_name')}</span>
                      </div>
                      <div>
                        <span>
                          {localStorage.getItem('email')}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <IconButton
                    aria-owns={open ? "simple-popper" : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleClick}
                    className="user-profile-btn"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Popover
                  id="simple-popper"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <div>
                    <Button variant="outlined" onClick={this.handleLogout}><span className="add-account">Sign out</span></Button>
                  </div>

                </Popover>
              </div>
            </Toolbar>
            <Drawer
              appBarProps={this.state.open}
              props={this.props}
            />
          </AppBar>
        </div>
      </MuiThemeProvider>
    )
  }

}
export default withRouter(DashboardComponent);