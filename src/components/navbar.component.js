import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import axios from 'axios';
import cookies from 'react-cookie';
export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.getTodos = this.getTodos.bind(this);

    this.state = {
      name: "React"
    };
    this.getTodos = this.getTodos.bind(this);
  }

  async getTodos() {
    let data = await axios
      .get("http://localhost:5000/discussion", {withCredentials: true})
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ todos: data.data });
    
  }
  componentDidMount(){
    this.getTodos();
  }
  logout = () => {
    const user = {
      logout: "undefined"
    }
    axios.post('http://localhost:5000/logout', user,  {withCredentials: true})
      .then(res =>{
        window.location.reload(false);
        });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="d-flex navigation">
        <div className="d-flex navigation_sub">
          <Link to="/"><img src={logo}></img></Link>
        </div>
        <div className="d-flex">
        <Link className="nav_link login" to="/register"><p>Register</p></Link>
        {todos == 'undefined' ? (
          <Link className="nav_link login" to="/login"><p>Login</p></Link>
        ):(
          <button className="nav_link login" onClick={() => { this.logout() }}><p>Logout</p></button>
        )}
        </div>
        
      </div>
    );
  }
}