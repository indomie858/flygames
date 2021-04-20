const CLIENT_ID = process.env.REACT_APP_IGDB_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_IGDB_CLIENT_SECRET;

let axios = require("axios").default;

class APIUtility {
  // Utility class containing methods for making different API calls,
  // used for retrieving data from the IGDB API for the app.

  constructor() {
    // These values are retrieved from the .env file,
    // so that we don't push keys to the public source code.
    this.client_id = CLIENT_ID;
    this.client_secret = CLIENT_SECRET;
  }

  async setToken() {
    // Todo: check if the current access token is valid, and only make a new request if this token is not.
    this.token = await this.requestNewToken();
  }

  requestNewToken() {
    // Return a fulfilled promise containing the access token.
    return axios
      .post("https://id.twitch.tv/oauth2/token", null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      })
      .then(function (response) {
        return response.data.access_token;
      });
  }

  async getGameInfo(gameID) {
    await this.setToken();
    // Get game info for the single game page from a game ID.
    const body = `
      fields name, summary, 
      screenshots.url;
      where id = ${gameID};
    `
    return this.makeRequest(body)
  }

  async getTop10Games() {
    // Gets the top 10 games,
    // for use in the main landing page.

    await this.setToken();

    // This is where we can tweak the API call to get different results.
    const body =
      "fields name, cover.url, rating, total_rating, release_dates.human;where total_rating > 90 & release_dates.date > 1609459231;sort total_rating desc;limit 10;";
    return this.makeRequest(body);
  }

  async searchGameByTitle(gameTitle) {
    // searches for game using title only
    // for use in search bar

    await this.setToken();

    // This is where we can tweak the API call to get different results.
    const body =
      `search "${gameTitle}"; fields name, cover.url, rating, total_rating, release_dates.human, genres.name; limit 40;`;
    
    return this.makeRequest(body);
  }

  async searchGameByTitleAndGenre(gameTitle, genre) {
    // searches for game using both title and genre
    // for use in search bar

    await this.setToken();

    // This is where we can tweak the API call to get different results.
    const body =
      `search "${gameTitle}"; fields name, cover.url, rating, total_rating, release_dates.human, genres.name; where genres.name = "${genre}"; limit 40;`;
    
    return this.makeRequest(body);
  }

  async searchGameByGenre(genre) {
    // searches for game using genre only
    // for use in search bar

    await this.setToken();

    // This is where we can tweak the API call to get different results.
    const body =
      `fields name, cover.url, rating, total_rating, release_dates.human, genres.name; where total_rating > 90 & genres.name = "${genre}"; limit 40;`;
    
    return this.makeRequest(body);
  }

  async makeRequest(bodyArg) {
    // generic function to make requests to igdb api
    await this.setToken();

    const body = bodyArg;
    
    return axios
      .post(
        "https://flygame-igdb-proxy.herokuapp.com/https://api.igdb.com/v4/games",
        body,
        {
          headers: {
            "Client-ID": CLIENT_ID,
            Authorization: "Bearer " + this.token,
            "Content-Type": "text/plain",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default APIUtility;
