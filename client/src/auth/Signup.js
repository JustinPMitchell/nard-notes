import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token);
      this.props.updateUser();
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    return (
      <form className="Signup" onSubmit={this.handleSubmit}>
        <input className="signup-input" id="email" name="Email"
          placeholder="email@gmail.com"
          value={this.state.email}
          onChange={this.handleEmailChange} 
        />
        <input className="signup-input" id="password" name="Password"
          placeholder="********"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange} 
        />                                                                
        <button type="submit" className="signup-button btn-primary">SignUp</button>
      </form>
    );
  }
}

export default Signup;