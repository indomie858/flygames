import React, { useState } from "react";
import Logo from "../images/logo.png";
import { navigate } from "@reach/router"
import { Link } from "@reach/router";


const Navbar = () => {
  // state for search bar input
  const [inputText, setInputText] = useState('');

  const [genre, setGenre] = useState('all');

  const onSubmit = (e) => {
    // comment this line if we want the search to refresh the page when pressing submit
    //e.preventDefault();

    // checks if search and/or genre category has been filled. navigates to correct url
    if (!inputText && !genre) {
      e.preventDefault();
      alert('Please enter title/keyword, or select a category');
    } else if (!inputText && genre) {
      navigate(`/searchResults/bygenre/${genre}`);
    } else {
      navigate(`/searchResults/${inputText}/${genre}`);
    }
    
    // if (inputText && !genre) {
    //   navigate(`/searchResults/${inputText}`);
    // } else {
    //   navigate(`/searchResults/${inputText}+${genre}`);
    // }
    
    //clears search when submit is clicked
    setInputText('');
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <Link to={'/'}><img src={Logo} alt="FlyGames" className="logo" ></img></Link>
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

          <select id="categories" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="all">All Genres</option>
            <option value="Adventure">Adventure</option>
            <option value="Arcade">Arcade</option>
            <option value="Fighting">Fighting</option>
            <option value="Indie">Indie</option>
            <option value="MOBA">MOBA</option>
            <option value="Music">Music</option>
            <option value="Platform">Platform</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Racing">Racing</option>
            <option value="Role-playing (RPG)">Role-playing (RPG)</option>
            <option value="Shooter">Shooter</option>
            <option value="Simulator">Simulator</option>
            <option value="Sport">Sport</option>
            <option value="Strategy">Strategy</option>
            <option value="Tactical">Tactical</option>
          </select>

          <input type='submit' value='Search Game' />
        </form>

      </div>
    </div>
  );
};

export default Navbar;
