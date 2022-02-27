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
          <Link className="nav_link" to="/"><p>About Us</p></Link>
        </div>
        <div className="d-flex">
        <Link className="nav_link login" to="/register"><p>Register</p></Link>
        <Link className="nav_link login" to="/login"><p>Log in</p></Link>
        </div>
        
      </div>
    );
  }
}