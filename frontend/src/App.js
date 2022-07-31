import React from 'react';

// use to create different routes to different components
import { Switch, Route, Link } from "react-router-dom"; 

import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;