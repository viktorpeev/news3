import Navbar from "./components/navbar.component";
import NewsList from "./components/news-list.component";
import EditNews from "./components/edit-news.component";
import ShowNews from "./components/single-news.component";
import CreateNews from "./components/create-news.component";
import Login from "./components/login.component"
import Register from "./components/register.component"
import NewsListUserView from "./components/news-list-user-view.component";
import {  BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React  from 'react';
import './main.css';

function App() {
  return (
    <div className="App">
     <Router>
       <Navbar/>
       <Route path="/" exact component={NewsListUserView}/>
       <Route path="/admin" exact component={NewsList}/>
       <Route path="/edit/:id" exact component={EditNews}/>
       <Route path="/news/:id" exact component={ShowNews}/>
       <Route path="/create" exact component={CreateNews}/>
       <Route path="/register" exact component={Register}/>
       <Route path="/login" exact component={Login}/>
     </Router>
    </div>
  );
}

export default App;
