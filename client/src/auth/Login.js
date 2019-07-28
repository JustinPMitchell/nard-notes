import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('mernToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
      window.location.href = "/profile";
    }).catch((error) => {
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }

  render() {
    if(this.props.user && this.props.user !== null){
      return (<Redirect to="/profile" />);
    }
    return (
      <form className="Login" onSubmit={this.handleSubmit}>
        <input className="login-input" id="email" name="Email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input className="login-input" id="password" name="Password"
          placeholder="Password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button type="submit" className="btn-primary">Login</button>
        <Link to="/signup"><button className="btn-primary signup-button">Sign Up</button></Link>
      </form>
    );
  }
}

export default Login;
