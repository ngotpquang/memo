import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';


class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <Home />
      </div>
    );
  }
}

export default App;
