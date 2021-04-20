import React, { useState, useEffect } from "react";
import APIUtility from "../utils/APIUtility";
import GameCard from "../Components/GameCard";
import Spinner from "../Components/Spinner";


const SearchPage = ({ searchQuery }) => {
    const [games, setGames] = useState([]);
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
            let apiUtil = new APIUtility();
            const response = await apiUtil.searchForGame(searchQuery);
            console.log("Response", response);
            setGames(response);
            setLoading(false);
        }
        fetchGames();
    }, []);

    return (
        <>
            <h1>Search Results: "{searchQuery}"</h1>
            <div className="grid">
                {games.map((game) => (
                    <GameCard
                        gameName={game.name}
                        imageUrl={getCoverSizeBig(game.cover.url)}
                        gameRating={game.rating}
                        gameID={game.id}
                    />
                ))}
            </div>
            {loading && <Spinner />}
        </>
    );
};

export default SearchPage;