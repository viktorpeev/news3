import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercises.component";
import CreateUser from "./components/create-user.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
     <Router>
       <Navbar/>
       <br/>
       <Route path="/" exact component={ExercisesList}/>
       <Route path="/edit/:id" exact component={EditExercise}/>
       <Route path="/create" exact component={CreateExercise}/>
       <Route path="/user" exact component={CreateUser}/>
     </Router>
    </div>
  );
}

export default App;
