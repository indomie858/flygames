import logo from './logo.svg';
import './App.css';



const axios = require('axios').default;
axios.post('https://id.twitch.tv/oauth2/token', null, {
  params: {
    client_id: '',
    client_secret: '',
    grant_type: 'client_credentials'
  }
})
  .then(function (response) {
    console.log(response)
    console.log("before igdb post " + response.data.access_token)
    const body = "fields name, rating, total_rating;where total_rating > 90 & release_dates.date > 1609459231;sort total_rating desc;limit 10;"
    axios.post('https://api.igdb.com/v4/games', body, {
      headers: {
        'Client-ID': '',
        'Authorization': 'Bearer ' + response.data.access_token,
        'Content-Type': 'text/plain'
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
      console.log("after igdb post " + response.data.access_token)
  })
  .catch(function (error) {
    console.log(error)
  })











function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World! I'm supposed to be a game website soon.</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
