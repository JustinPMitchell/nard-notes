import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './auth/Login';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.user !== null){
      return(
        <Redirect to="/profile" />
      );
    }else{
      return(
        <div className="Home">
          <Login setFlash={this.props.setFlash} updateUser={this.props.updateUser} />
        </div>
      );
    }
  }
}

export default Home;
