import React from 'react';
import './App.css';
import NavigationContainer from './component/navigation/Navigation';
import Home from './component/home/Home';


class App extends React.Component {
  render() {
    return (
      <div className="app">
          <NavigationContainer />
          <Home />
      </div>
    );
  }
}

export default App;
