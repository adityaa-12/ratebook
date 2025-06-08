import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchResults: React.FC = () => {

  const [isData, setIsData] = useState<boolean>(false);

  interface typeSearch {
    ID: number;
    AUTHOR: string;
    AVERAGE_RATING: string;
    BOOKNAME: string;
    COVER_URL: string;
    GENRE: string;
    PUBLISHED_YEAR: number;
    RATING_COUNT: number;
  }
  const [searchData, setSearchData] = useState<typeSearch[]>([{
    ID: 0,
    AUTHOR: "",
    AVERAGE_RATING: "",
    BOOKNAME: "",
    COVER_URL: "",
    GENRE: "",
    PUBLISHED_YEAR: 0,
    RATING_COUNT: 0,
  }]);

  const location = useLocation();

  useEffect(() => {
    const searchData = location.state;

    if (searchData == "") {
      setIsData(false);
      return;
    }

    setIsData(true);
    setSearchData(searchData);
  }, [location.state]);


  return (
    <div>
      <div id="wrapper" className='w-[85vw] mx-auto max-sm:w-[95vw]'>
        {
          isData && (
            <div id="search-results" className='bg-stone-100 p-2'>

            </div>
          )
        }
        {
          !isData && (
            <div id="not-search-found" className='bg-stone-100 p-2'>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <span></span>
                <h2 className="text-xl font-semibold">No Results Found!</h2>
                <p className="mt-2 text-md">We couldn't find any books matching your search. Try a different keyword.</p>
              </div>
            </div>
          )
        }
        <div id="see-other-books" className="mt-8 p-4">
          <div id="head" className="font-semibold text-xl mb-4">
            <p>Browse Books</p>
          </div>

          <div id="card-container" className="flex flex-wrap gap-4">

            <div
              id="card"
              className="flex flex-col sm:flex-row gap-2 py-2.5 px-2.5 rounded-xl border border-gray-200 w-full"
            >
              {/* Image Section */}
              <div id="img" className="flex-shrink-0 w-full sm:w-[180px] md:w-[200px]">
                <img
                  src="https://marketplace.canva.com/EAGEuNwgF3k/1/0/1003w/canva-modern-and-simple-prayer-journal-book-cover-UL8kCB4ONE8.jpg"
                  alt="Atomic Habits"
                  className="w-full h-full max-h-[280px] object-center rounded-md shadow-md"
                />
              </div>

              {/* Book Details */}
              <div id="details" className="flex flex-col gap-2 px-1 sm:px-4 py-2">
                <p className="font-bold text-2xl text-gray-900">Atomic Habits</p>

                <span className="flex items-center gap-1 text-gray-600">
                  <p>By</p>
                  <p className="font-medium">Will Jacks</p>
                </span>

                <p className="text-gray-500">
                  Genre/<span className="font-medium text-gray-600">Self Help</span>
                </p>

                <div id="rating" className="flex items-center gap-1 text-amber-600">
                  <span className="material-symbols-outlined">star_half</span>
                  <p>4.5</p>
                  <span className="text-gray-900">(255)</span>
                </div>

                <div id="year" className="text-gray-500 text-sm">
                  <p>2018</p>
                </div>

                <p className="text-gray-700 line-clamp-3 text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem asperiores adipisci natus distinctio optio aspernatur error non sequi quasi iure, quo voluptatum nulla vel eum.
                </p>

                <div id="btns" className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-1.5 text-sm cursor-pointer">
                    <span className="material-symbols-outlined">open_in_new</span>
                    Read Reviews
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 flex items-center justify-center gap-1.5 text-sm cursor-pointer">
                    <span className="material-symbols-outlined">bookmark</span>
                    Save to Favorites
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SearchResults;
