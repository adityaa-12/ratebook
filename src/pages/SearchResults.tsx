import React, { useEffect, useState } from 'react'
import { data, useLocation } from 'react-router-dom'

const SearchResults: React.FC = () => {

  const [isData, setIsData] = useState<boolean>(false);

  interface typeSearch {
    id: number;
    author: string;
    average_rating: string;
    bookname: string;
    cover_url: string;
    genre: string;
    published_year: number;
    rating_count: number;
  }
  const [searchData, setSearchData] = useState<typeSearch>({
    id: 0,
    author: "",
    average_rating: "",
    bookname: "",
    cover_url: "",
    genre: "",
    published_year: 0,
    rating_count: 0,
  });

  const location = useLocation();

  useEffect(() => {
    const searchData = location.state;
    console.log(searchData);


    if (searchData.data == 0) {
      setIsData(false);
      return;
    }

    setIsData(true);
    setSearchData(searchData);
  }, [location.state]);

  return (
    <div>
      <div id="wrapper">
      <div id="search-results">
        
      </div>
      <div id="see-other-books">

      </div>
      </div>
    </div>
  )
}

export default SearchResults
