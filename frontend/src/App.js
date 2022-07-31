import React from 'react';

// use to create different routes to different components
import { Switch, Route, Link } from "react-router-dom"; 

import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  // React.useState is a hook that allows for the addition of local state to functional component
  // useState returns an array with two values an a function that can be updated
  const [user, setUser] = React.useState(null);

  // set user state
  async function login(user = null) { // default user to null
    setUser(user);
  }

  // set user to null
  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {/* Link allows routing to different components */}
              <Link to={"/movie"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              { user ? (
                  // display if user is logged in
                  <a onClick={logout}>Logout User</a>
                ) : (
                  // display if user is logged out
                  <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default App;