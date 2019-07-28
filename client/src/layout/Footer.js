import React, { Component } from 'react';


class Footer extends Component {
  render(){
    return(
      <footer className="Footer">
          <span className="footer-text">Created by <a className="footer-link" target="_blank" href="http://www.justinpaulmitchell.com">Justin Paul Mitchell</a> &copy; {new Date().getFullYear()}</span>
      </footer>
      );
  }
}

export default Footer;


