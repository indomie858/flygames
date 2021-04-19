import React from "react";
import { Router } from "@reach/router";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import Navbar from "./Components/Navbar";
import "./styles.css";
import APIUtility from "./utlis/APIUtility";


const App = () => {

  //function to search for a game
  const searchGame = async (gameTitle) => {
    let apiUtil = new APIUtility();
    const response = await apiUtil.searchForGame(gameTitle);
    console.log("Searched game Response", response);
  }

  return (
    <>
      <Navbar onSearch={searchGame} />
      <Router>
        <Home path="/" />
        <GamePage path="/:gameID" />
      </Router>
    </>
  );
};

export default App;
