import React from "react";
import { Router } from "@reach/router";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import SearchPage from "./Pages/SearchPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./styles.css";
import APIUtility from "./utils/APIUtility";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Home path="/" />
        <GamePage path="/:gameID" />
        <SearchPage path="/searchResults/:gameTitle/:gameGenre" />
      </Router>
      <Footer />
    </>
  );
};

export default App;
