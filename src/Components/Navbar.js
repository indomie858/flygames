import React, { useState } from "react";
import Logo from "../images/logo.png";
import { navigate } from "@reach/router"
import { Link } from "@reach/router";


const Navbar = () => {
  // state for search bar input
  const [inputText, setInputText] = useState('');
  // state for game genre option select
  const [genre, setGenre] = useState('all');

  const onSubmit = (e) => {
    // checks if search and/or genre category has been filled. navigates to correct url
    if (!inputText && !genre) {
      e.preventDefault();
      alert('Please enter title/keyword, or select a category');
    } else if (!inputText && genre) {
      // Reference for navigate function https://reach.tech/router/api/navigate
      navigate(`/searchResults/bygenre/${genre}`);
    } else {
      // Reference for navigate function https://reach.tech/router/api/navigate
      navigate(`/searchResults/${inputText}/${genre}`);
    }
    
    //clears search when submit is clicked
    setInputText('');
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        {/* Reference for link: https://reach.tech/router/tutorial/03-link */}
        <Link to={'/'}><img src={Logo} alt="FlyGames" className="logo" ></img></Link>
      </div>
      <div className="nav-bar-right">
        {/* form for searching games */}
        <form onSubmit={onSubmit}>
          {/* input textbox for searching */}
          <input
            className="search"
            type='text'
            placeholder='Search'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} />
          {/* dropdown menu with game genres */}
          <select className='categories' id="categories" value={genre} onChange={(e) => setGenre(e.target.value)}>
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

          <input type='submit' value='Search Game' className='button-styled'/>
        </form>

      </div>
    </div>
  );
};

export default Navbar;
