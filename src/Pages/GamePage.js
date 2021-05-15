import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";
import Carousel from "../Components/Carousel";
import Spinner from "../Components/Spinner";
import GameCard from "../Components/GameCard";
import Rating from "../Components/Rating";
import NoImage from "../images/no-image-available.png";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Link } from "@reach/router";

const StyledListItem = styled.div`
  border: 2px solid #35373e;
  background-color: #52deff;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  display: inline-block;
`

const StyledDate = styled.h5`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

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
  }, [gameID])

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
          <div class="flex-left pad-24">
            <h1 class="text-center">
              {gameInfo.name}
            </h1>
            <div class="flex-justify-center">
              {gameInfo.hasOwnProperty("genres") ? gameInfo.genres.map((genre) => <Link to={`/searchResults/bygenre/${genre.name}`}><StyledListItem>{genre.name}</StyledListItem></Link>) : null}
            </div>
            <div>
              <p class="text-justify">
                {gameInfo.summary}
              </p>
            </div>
            <Rating rating={Math.round(gameInfo.total_rating)}></Rating>
          </div>
          <div class="flex-right pad-24">
            <h4>Publishers & Developers</h4>
            <div>
              {companies == undefined ? null : companies.map((company) => <StyledListItem>{company.name}</StyledListItem>)}
            </div>
            <h4>Release Date</h4>
            {gameInfo.release_dates == undefined ? null : <StyledDate>{gameInfo.release_dates[0].human}</StyledDate>}
            <h4>Platforms</h4>
            {gameInfo.platforms == null ? null : gameInfo.platforms.map((platform) => <StyledListItem>{platform.abbreviation}</StyledListItem>)}
          </div>
        </div>
        <div class="similar-games">
          <h3>Similar Games</h3>
          <div>
            <div className="grid">
              {similarGames == null ? null : similarGames.map((game) => (
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

  return (loading ? <Spinner /> : gameInfoMain());
};

export default GamePage;