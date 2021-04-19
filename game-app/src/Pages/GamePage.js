import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";

const GamePage = ({ gameID }) => {
  const [gameInfo, setGameInfo] = useState([])

  useEffect(() => {
    async function requestGameInfo() {
      let apiUtil = new APIUtility()
      let response = await apiUtil.getGameInfo(gameID)
      setGameInfo(response[0])
      console.log(gameInfo)
    }
    requestGameInfo()
  }, [])

  return (
    <>
      <h1>{gameID}</h1>
    </>
  );
};

export default GamePage;
