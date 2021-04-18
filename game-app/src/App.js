
import React from "react";
import { Router } from "@reach/router";
import Home from "./Pages/Home";
import GamePage from "./Pages/GamePage";
import Navbar from "./Components/Navbar";
import "./styles.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Home path="/" />
        <GamePage path="/:gameID" />
      </Router>
    </>
  );
};


export default App;
