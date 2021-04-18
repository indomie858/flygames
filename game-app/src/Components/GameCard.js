import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const StyledGameCard = styled.div`
  border-radius: 25px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    transition: all 0.3s;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }
`;

const GameCard = ({ gameName, imageUrl, gameRating, gameID }) => {
  return (
    <>
      <StyledGameCard>
        <Link to={`/${gameID}`}>
          <img src={imageUrl} alt={gameName} />
        </Link>
      </StyledGameCard>
    </>
  );
};

export default GameCard;
