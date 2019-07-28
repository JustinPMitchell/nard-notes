import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

let displayDates;
class Nav extends Component {                                              
  render(){
    let links = (
        <span>
          <Link to="/">Home</Link>
        </span>);
    if(this.props.user){
      links = (
        <span>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    return(
      <nav className="Nav">
        <ul className="nav-wrapper">
          {links}
        </ul>
      </nav>
    );
  }
}

export default Nav;