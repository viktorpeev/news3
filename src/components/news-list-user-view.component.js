import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const News = props => (
<Link to={"/news/"+props.news._id}>
<div className="card">
        <img src={props.news.image} className="card-img-top"/>
    <div className="card-body">
        <p className="card-text">{props.news.title}</p>
        <div className="d-flex">
            <p className="card-text">{props.news.author}</p>
            <p className="card-text">{props.news.date.substring(0,10)}</p>
        </div>
    </div>
</div>
</Link>
)

export default class NewsList extends Component {
  constructor(props) {
    super(props);

    this.deleteNews = this.deleteNews.bind(this)

    this.state = {news: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/news/')
      .then(response => {
        this.setState({ news: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
     
  }

  deleteNews(id) {
    axios.delete('http://localhost:5000/news/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      news: this.state.news.filter(el => el._id !== id)
    })
  }

  newsList() {
    return this.state.news.map(currentnews => {
      return <News news={currentnews} deleteNews={this.deleteNews} key={currentnews._id}/>;
    })
  }

  render() {
    return (
      <div className="container-fluid homepage">
        { this.newsList() }
      </div>
    )
  }
}