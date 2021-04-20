import React, { useState } from "react";
import Logo from "../images/logo.png";
import { navigate } from "@reach/router"


const Navbar = ({ onSearch }) => {
  // state for search bar input
  const [inputText, setInputText] = useState('')

  const onSubmit = (e) => {
    // comment this line if we want the search to refresh the page when pressing submit
    //e.preventDefault();

    if (!inputText) {
      alert('Please enter the game title or keyword.');
      return
    }
    //navigates to search page and passes search query name
    navigate(`/searchResults/${inputText}`);
    //clears search when submit is clicked
    setInputText('');
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <img src={Logo} alt="FlyGames" className="logo"></img>
        fly games
      </div>
      <div className="nav-bar-right">
        {/* <div>Search bar</div> */}
        {/* <div>dropdown</div> */}

        {/* form for searching games */}
        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Search'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} />

          <select id="categories">
            <option value="all">All</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Simulation">Simulation</option>
          </select>

          <input type='submit' value='Search Game' />
        </form>

      </div>
    </div>
  );
};

export default Navbar;
