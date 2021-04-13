import logo from './logo.svg';
import './App.css';
import APIUtility from './utils/APIUtility.js';
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = { top10games: []}
  }

  componentDidMount() {
    let apiUtil = new APIUtility();
    apiUtil.getTop10Games().then(response => this.setState({top10games: response}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World! I'm supposed to be a game website soon.</h1>
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.top10games.map(game => 
              <li>
                {game.name}
              </li>
          )}
        </header>
      </div>
    );
  }
}


export default App;
