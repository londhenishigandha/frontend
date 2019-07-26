import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './pages/registration';
import Login from './pages/login';
import Dashboard from './pages/dashboard'
import Forgot from './pages/forgot'
import Notes from './pages/notes'
import resetpass from './pages/resetpass'
import Archive from './pages/archive';
import Reminder from './pages/reminder';
import Trash from './pages/trash';


class App extends Component {
  render() {
    return (
      <div>
       <Router> 
       <Route exact path="/" component={Login}></Route>

            <Route path="/registration" component={Register}></Route>
            <Route path="/forgot" component={Forgot}></Route> 
            <Route path="/login" component={Login}></Route>
           <Route path='/dashboard' component={Dashboard}></Route>    
           <Route path='/notes' component={Notes}></Route>   
           <Route path='/resetpassword' component={resetpass}></Route>   
           <Route path='/archive' component={Archive}></Route>
           <Route path='/reminder' component={Reminder}></Route> 
           <Route path='/trash' component={Trash}></Route>

        </Router>
      </div>
    );
  }
}

export default App;





