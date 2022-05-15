import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNews extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      author: '',
      date: new Date(),
      image:null,
    }
  }
  componentDidMount() {
    axios.get("http://localhost:5000/isadmin", {withCredentials: true})
      .then(res => {
        if(res.data != "true"){
          this.props.history.push('/');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const news = {
      title:this.state.title,
      description: this.state.description,
      author: this.state.author,
      image: this.state.image,
      date: this.state.date,
    }

    axios.post('http://localhost:5000/news/add', news)
      .then(res => console.log(res.data));

    window.location = '/';
  }
  
  render() {
    return (
    <div>
      <h3>Create News</h3>
      <form onSubmit={this.onSubmit}
      encType="multipart/form-data">
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker className="date"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Image url: </label>
          <input type="text"
              required
              name="image"
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create News" className="btn btn-primary confirm" />
        </div>
      </form>
    </div>
    )
  }
}