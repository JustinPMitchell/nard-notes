import React, { Component } from 'react';

class Logout extends Component {
  handleLogout = (e) => {
    localStorage.removeItem('mernToken');
    this.props.updateUser();
  }

  render() {
    return (
      <a href='/' onClick={this.handleLogout}>Logout</a>
    );
  }
}

export default Logout;