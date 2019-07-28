import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js';
import Home from './Home.js';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    let token = localStorage.getItem('mernToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        localStorage.setItem('mernToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
      }).catch(err => {
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div id="content-wrapper">
            <Nav user={this.state.user} updateUser={this.getUser} />
            <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
            <Route exact path="/" component={() => (<Home user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
            <Route path="/login" component={
              () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
            <Route path="/signup" component={
              () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
            <Route path="/profile" component={
              () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;