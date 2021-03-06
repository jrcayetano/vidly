import React, { Component } from 'react';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import { Route, Redirect, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/not-found';
import MoviesForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/new" component={MoviesForm} />
            <Route path="/movies/:id" component={MoviesForm} />
            <Route path="/movies" render={props => <Movies {...props} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
