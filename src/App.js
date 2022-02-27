import Navbar from "./components/navbar.component";
import NewsList from "./components/news-list.component";
import EditNews from "./components/edit-news.component";
import ShowNews from "./components/single-news.component";
import CreateNews from "./components/create-news.component";
import CreateUser from "./components/register.component";
import NewsListUserView from "./components/news-list-user-view.component";
import Login from "./components/login.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
       <Route path="/register" exact component={CreateUser}/>
       <Route path="/login"><Login setLoginUser={setLoginUser}/></Route>
     </Router>
    </div>
  );
}

export default App;
