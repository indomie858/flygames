import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";
import Carousel from "../Components/Carousel"
import Spinner from "../Components/Spinner"

const GamePage = ({ gameID }) => {
  const [gameInfo, setGameInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function requestGameInfo() {
      let apiUtil = new APIUtility()
      let response = await apiUtil.getGameInfo(gameID)
      setLoading(true)
      setGameInfo(response[0])
    }
    requestGameInfo() 
    console.log(gameInfo)
  }, [])

  return (
    <>
      {gameInfo.screenshots ? 
        <Carousel screenshots={gameInfo.screenshots} /> : <Spinner />}
        <main className="container">
          <h1>{gameInfo.name}</h1>
          <p>Rating: {gameInfo.rating}</p>
          <p>
            {gameInfo.summary}
          </p>
          <h3>Similar Games</h3>
          <div className="grid">
                {gameInfo.similar_games ? gameInfo.similar_games.map((game_id) => (
                    <div>{game_id}</div>
                )) : <Spinner />}
            </div>
        </main>
    </>
  );
};

export default GamePage;
