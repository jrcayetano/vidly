import React, { Component } from 'react';
import './App.css';
import TableMovie  from './components/TableMovie'

class App extends Component {
  render() {
    return (
      <main className="container">
        <TableMovie />
      </main>
    );
  }
}

export default App;
