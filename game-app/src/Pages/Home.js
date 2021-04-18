import React, { useState, useEffect } from "react";
import APIUtility from "../utlis/APIUtility";
import GameCard from "../Components/GameCard";
import Spinner from "../Components/Spinner";

const Home = () => {
  const [topGames, setTopGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCoverSizeBig = (imageURL) => {
    //this function returns the big cover image url
    const regex = /thumb/;
    let originalImageURL = imageURL;
    let newImageURL = originalImageURL.replace(regex, "cover_big");
    return newImageURL;
  };

  useEffect(() => {
    async function fetchTopGames() {
      let apiUtil = new APIUtility();
      const response = await apiUtil.getTop10Games();
      console.log("Response", response);
      setTopGames(response);
      setLoading(false);
    }
    fetchTopGames();
  }, []);

  return (
    <>
      <div className="grid">
        {topGames.map((game) => (
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

export default Home;
