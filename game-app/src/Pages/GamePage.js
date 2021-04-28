import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";
import Carousel from "../Components/Carousel";
import Spinner from "../Components/Spinner";
import GameCard from "../Components/GameCard";
import NoImage from "../images/no-image-available.png";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledGenre = styled.div`
  border: 2px solid #35373e;
  background-color: #52deff;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  display: inline-block;
`

const GamePage = ({ gameID }) => {
  const [gameInfo, setGameInfo] = useState([])
  const [companies, setCompanies] = useState([])
  const [similarGames, setSimilarGames] = useState([])
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

      let similarGames = await apiUtil.getGamesByIDs(response[0].similar_games)
      setSimilarGames(similarGames)
      
      setLoading(false)
    }
    requestGameInfo() 
  }, [])

  const getCoverSizeBig = (imageURL) => {
    //this function returns the big cover image url
    const regex = /thumb/;
    let originalImageURL = imageURL;
    let newImageURL = originalImageURL.replace(regex, "cover_big");
    return newImageURL;
  };


  function gameInfoMain() {
    return <>
          <Carousel screenshots={gameInfo.screenshots} />
          <main className="main-container">
            <div class="horizontal-flex">
              <div class="flex-left horizontal-flex flex-justify-center">
                { gameInfo.genres.map((genre) => <StyledGenre>{genre.name}</StyledGenre>) }
              </div>
              <div class="flex-right">
                { gameInfo.rating }
              </div> 
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
                    {companies.map((company) => <li>{company.name}</li>)}
                  </ul>
                  <h4>Release Date</h4>
                    <ul>
                    {gameInfo.release_dates[0].human}
                    </ul>
                  <h4>Platforms</h4>
                    <ul>
                    {gameInfo.platforms.map((platform) => <li>{platform.abbreviation}</li>)}
                    </ul>
            </div>
            </div>
            <div class="similar-games">
              <h3>Similar Games</h3>
              <div>
                <div className="grid">
                  {similarGames.map((game) => (
                      <GameCard
                        gameName={game.name}
                        imageUrl={getCoverSizeBig(game.cover ? game.cover.url : `${NoImage}`)}
                        gameRating={game.rating}
                        gameID={game.id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </main>
        </>
  }

  return ( loading ? <Spinner /> : gameInfoMain() );

};

export default GamePage;
