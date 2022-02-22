import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
export default class Navbar extends Component {

  render() {
    return (
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">News.bg</Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item">
      //     <Link to="/" className="nav-link">Exercises</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/create" className="nav-link">Create Exercise Log</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/user" className="nav-link">Create User</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
      <div className="d-flex navigation">
        <div className="d-flex navigation_sub">
          <Link to="/"><img src={logo}></img></Link>
          <Link to="/"><p>Special Reports</p></Link>
          <Link to="/"><p>About Us</p></Link>
        </div>
        <Link className="login" to="/"><p>Log in</p></Link>
      </div>
    );
  }
}