import React from "react";
import Logo from "../images/logo.png";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        <img src={Logo} alt="FlyGames" className="logo"></img>
        fly games
      </div>
      <div className="nav-bar-right">
        <div>Search bar</div>
        <div>dropdown</div>
      </div>
    </div>
  );
};

export default Navbar;
