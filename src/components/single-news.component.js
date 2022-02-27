import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ShowNews extends Component {
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

  onChangeImage(e) {
    this.setState({
      image: e.target.value
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
      author: this.state.duration,
      date: this.state.date
    }

    console.log(news);

    axios.post('http://localhost:5000/news/update/' + this.props.match.params.id, news)
      .then(res => console.log(res.data));

    window.location = '/admin';
  }

  render() {
    return (
    <div className="single_page">
      <div className="d-flex center single_description">
        <h1>{this.state.title}</h1>
      </div>
      <div className="d-flex center">
        <img src={this.state.image}/>
      </div>
      <div className="d-flex center single_description">
        <p>{this.state.description}</p>
      </div>
      <div className="d-flex center">
        <h5>Article by {this.state.author}</h5>
      </div>
    </div>
    )
  }
}