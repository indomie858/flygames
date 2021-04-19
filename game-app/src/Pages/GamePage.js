import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";

const GamePage = ({ gameID }) => {
  const [gameInfo, setGameInfo] = useState([])
  const [loading, setLoading] = useState(true)

  const getScreenShot720p = (imageURL) => {
    const regex = /t_thumb/;
    let originalImageURL = imageURL;
    let newImageURL = originalImageURL.replace(regex, "t_720p");
    return newImageURL;
  }

  useEffect(() => {
    async function requestGameInfo() {
      let apiUtil = new APIUtility()
      let response = await apiUtil.getGameInfo(gameID)
      setGameInfo(response[0])
    }
    requestGameInfo() 
  }, [])

  return (
    <>
      <h1>{gameInfo.name}</h1>
      <img src={
        getScreenShot720p(
          gameInfo.screenshots ? gameInfo.screenshots[0].url : ""
        )
        }></img>
      <p>
        {gameInfo.summary}
      </p>
    </>
  );
};

export default GamePage;
