import React, { useState, useEffect } from "react";
import NoImage from "../images/no-image-available.png";
import APIUtility from "../utils/APIUtility";
import GameCard from "../Components/GameCard";
import Spinner from "../Components/Spinner";
import styled from "styled-components";


const StyledMessage = styled.h2`
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    margin-top: 50px;
    `;

const SearchPage = ({ gameTitle, gameGenre }) => {
    //state for array of games returned from IGDB api
    const [games, setGames] = useState([]);
    //state for loading spinner
    const [loading, setLoading] = useState(true);

    const getCoverSizeBig = (imageURL) => {
        //this function returns the big cover image url
        const regex = /thumb/;
        let originalImageURL = imageURL;
        let newImageURL = originalImageURL.replace(regex, "cover_big");
        return newImageURL;
    };

    useEffect(() => {
        async function fetchGames() {
            //use this object to access functions for IGDB requests
            let apiUtil = new APIUtility();
            let response;
            //depending on props sent by Navbar.js, make IGDB API request
            if (gameTitle === 'bygenre') {
                //searching by genre only
                response = await apiUtil.searchGameByGenre(gameGenre);
            } else if (gameGenre === 'all') {
                //searching by title only
                response = await apiUtil.searchGameByTitle(gameTitle);
            } else {
                //searching by title and genre
                response = await apiUtil.searchGameByTitleAndGenre(gameTitle, gameGenre);
            }
            console.log("Response", response);
            setGames(response);
            setLoading(false);
        }
        fetchGames();
    }, []);

    return (
        <>
            <h1>Search Results {gameTitle === 'bygenre' ? 'Genre:' : `${gameTitle}`} {gameGenre}</h1>
            {/* grid that displays all game results from search */}
            <div className="grid">
                {games.length > 0 ? games.map((game) => (
                    <GameCard
                        gameName={game.name}
                        imageUrl={getCoverSizeBig(game.cover ? game.cover.url : `${NoImage}`)}
                        gameRating={game.rating}
                        gameID={game.id}
                    />
                )) : ''}
            </div>
            {loading && <Spinner />}
            {/* If no games found, output this message */}
            {(games.length > 0 && !loading) ? '' : <StyledMessage>No games found</StyledMessage>}
        </>
    );
};

export default SearchPage;