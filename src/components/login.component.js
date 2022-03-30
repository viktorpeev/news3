import React, { Component,useEffect, useState } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getTodos = this.getTodos.bind(this);

    this.state = {
      username: '',
      password: '',
      name: "React"
    };
    this.getTodos = this.getTodos.bind(this);
  }

  async getTodos() {
    axios.get("http://localhost:5000/discussion", {withCredentials: true})
      .then(response => {
        if(response.data != 'undefined')
        {
          this.props.history.push('/');
        }
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    
  }
  componentDidMount(){
    this.getTodos();
  }
    

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:5000/users/check', user,  {withCredentials: true})
      .then(res =>{
        if(res.data == "true"){
          window.location.reload(false);
          this.props.history.push('/');
        }
        else{
          console.log(res.data);
        }
        });

    this.setState({
      username: '',
      password: ''
    });
  
  }
  render() {
    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username:</label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>
              <div className="form-group"> 
                <label>Password: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
          </div> 
    )
  }      
}