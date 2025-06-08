import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");
  let baseURL = import.meta.env.VITE_API_URL;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(() => e.target.value);
  }

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchQuery();
    }
  }

  const searchQuery = async () => {

    if (!searchInput.trim()) return;

    try {
      let SearchURL = `${baseURL}books?search=${searchInput}`;

      let req = await fetch(`${SearchURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let res = await req.json();
      let data = res.data;

      if (req.ok) {
        navigate(`/results?search=${searchInput}`, { state: data });
        return;
      }

      if (!req.ok) {
        navigate(`/results?search=${searchInput}`, { state: data });
        return;
      }

    } catch (error) {
      console.log("Internal Server Error");
    }

  }

  const checkUser = () => {
    let isCookie = document.cookie;
    if (isCookie == "") {
      console.log("Not Found!");
      return;
    }

    console.log("Found");

  }

  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div>
      <div id="main-navbar" className='flex flex-row justify-between py-3.5 items-center max-sm:justify-center'>
        <div id="left-logo" className='font-semibold text-xl max-sm:hidden'>
          <Link to="/">Ratebook</Link>
        </div>
        <div id="user-options-wrapper" className='flex flex-row items-center gap-6 max-sm:w-full'>
          <div id="links" className='flex flex-row gap-4.5 font-medium text-stone-700 max-md:hidden'>
            <Link to="/about" className='hover:text-stone-950 hover:underline'>About Us</Link>
            <Link to="/books" className='hover:text-stone-950 hover:underline'>Browse Books</Link>
          </div>
          <div id="user-options" className='flex flex-row items-center gap-1.5 max-sm:w-full'>
            <div id="search-bar" className='flex flex-row items-center bg-stone-200 px-2.5 py-2.5 gap-1.5 rounded-md max-sm:w-full'>
              <button className='flex cursor-pointer text-stone-500' onClick={searchQuery}>
                <span className="flex material-symbols-outlined">
                  search
                </span>
              </button>
              <input type="text" placeholder='Search for books...' value={searchInput} name='search' id='search' className='outline-none text-md max-sm:w-full' autoComplete='off' onKeyDown={handleSearch} onChange={inputHandler} />
            </div>
            <div id="user-btns" className='flex flex-row items-center max-md:hidden'>
              <button onClick={checkUser} id="user-profile-desk" className='flex bg-stone-200 px-2.5 py-2.5 cursor-pointer rounded-md'>
                <span className="flex material-symbols-outlined">
                  account_circle
                </span>
              </button>
            </div>
            <div id="dropdown-mob">
              {
                !showNav && (
                  <button id="dropdown" className='flex bg-stone-200 px-2.5 py-2.5 cursor-pointer rounded-md md:hidden' onClick={() => setShowNav((prev) => !prev)}>
                    <span className="flex material-symbols-outlined">
                      arrow_drop_down
                    </span>
                  </button>
                )
              }
              {
                showNav && (
                  <button id="dropdown" className='flex bg-stone-200 px-2.5 py-2.5 cursor-pointer rounded-md md:hidden' onClick={() => setShowNav((prev) => !prev)}>
                    <span className="flex material-symbols-outlined">
                      close
                    </span>
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {
        showNav && (
          <div id="dropdown-links" className='bg-stone-100 p-2 w-full md:hidden z-50'>
            <div id="d-options" className='flex flex-col justify-start gap-1'>
              <Link id="option" to='/profile' className='flex flex-row text-md items-center justify-between px-2 py-1 cursor-pointer hover:text-stone-950 hover:bg-stone-200 rounded-md text-stone-700'>
                <p>Your Profile</p>
                <span className='flex'><span className="flex material-symbols-outlined">
                  chevron_right
                </span></span>
              </Link>
              <Link id="option" to="/about" className='flex flex-row text-md items-center justify-between px-2 py-1 cursor-pointer hover:text-stone-950 hover:bg-stone-200 rounded-md text-stone-700'>
                <p>About Us</p>
                <span className='flex'><span className="flex material-symbols-outlined">
                  chevron_right
                </span></span>
              </Link>
              <Link id="option" to="/" className='flex flex-row text-md items-center justify-between px-2 py-1 cursor-pointer hover:text-stone-950 hover:bg-stone-200 rounded-md text-stone-700'>
                <p>Go Home</p>
                <span className='flex'><span className="flex material-symbols-outlined">
                  chevron_right
                </span></span>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Header;
