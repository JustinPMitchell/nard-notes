import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.user){
      return (
        <div className='Profile'>
          <div className="profile-picture-wrapper">
            <img className="profile-picture" src="https://www.alitumbas.av.tr/uploads/empty-profile-picture-woman.jpg"></img>
          </div>
          <h2>{this.props.user.email}</h2>   
          <hr/>
        </div>
      );
    }
    else {
      return (
        <div className="Profile">
          <p>This is a profile page. You need to be logged in to view it.</p>
        </div>
      );
    }
  }
}

export default Profile;