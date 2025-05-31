import React from 'react'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  let query = "firstBook";
  const passLink = `/results?q=${query}`;
  return (
    <div>
      <div id="nav-bar">
        <div id="logo">
          <Link to="/">RateBook</Link>
        </div>
        <div id="search-bar">
          <input type="text" name="search" id="search" placeholder='Search Here...' />
          <Link to={passLink}>Search</Link>
        </div>
      </div>
    </div>
  )
}

export default Header;
