import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";
import Carousel from "../Components/Carousel"
import Spinner from "../Components/Spinner"
import { createPortal } from "react-dom";

const GamePage = ({ gameID }) => {
  const [gameInfo, setGameInfo] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function requestGameInfo() {
      let apiUtil = new APIUtility()
      let response = await apiUtil.getGameInfo(gameID)
      setLoading(true)
      setGameInfo(response[0])
      
      //let companyIDs = response[0].involved_companies.map()
      let companyObjects = await apiUtil.getCompanyInfoFromIDArray(response[0].involved_companies)
      setCompanies(companyObjects)
    }
    requestGameInfo() 
    setLoading(false)
  }, [])

  return ( 
          <>
            {gameInfo.screenshots ? <Carousel screenshots={gameInfo.screenshots} /> : <Spinner />}
            <main className="main-container">
              <div>
                  {gameInfo.aggregated_rating | gameInfo.genres ? 
                    gameInfo.genres.map((genre) => <span>{genre.name}</span>) :
                    <Spinner />}
              </div>
              <div class="horizontal-flex">
                <div class="flex-left">
                  <h1>
                    {gameInfo.name}
                  </h1>
                  <p>
                    {gameInfo.summary}
                  </p>
                </div>
                <div class="flex-right">
                    <h4>Companies</h4>
                    <ul>
                      {
                        companies.map((company) => <li>{company.name}</li>)
                      }
                    </ul>
                    <h4>Release Date</h4>
                      {gameInfo.release_dates}
                    <h4>Platforms</h4>
                      {gameInfo.platforms}
                </div>
              </div>
              <div class="similar-games">
                <h3>Similar Games</h3>
                <div>
                  <div className="grid">
                        {gameInfo.similar_games ? gameInfo.similar_games.map((game_id) => (
                            <div>{game_id}</div>
                        )) : <Spinner />}
                  </div>
                </div>
              </div>
            </main>
        </>
  );
};

export default GamePage;
