import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditNews extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      author: '',
      image: '',
      date: new Date(),
      users: []
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
    axios.get('http://localhost:5000/news/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          author: response.data.author,
          image: response.data.image,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  onChangeImage(e) {
    this.setState({
      image: e.target.value
    })
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

  onSubmit(e) {
    e.preventDefault();

    const news = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      image: this.state.image,
      date: this.state.date
    }

    console.log(news);

    axios.post('http://localhost:5000/news/update/' + this.props.match.params.id, news)
      .then(res => console.log(res.data));

    window.location = '/admin';
  }

  render() {
    return (
    <div>
      <h3>Edit news</h3>
      <form onSubmit={this.onSubmit}>
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
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
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
          <input type="submit" value="Edit News" className="btn btn-primary confirm" />
        </div>
      </form>
    </div>
    )
  }
}