import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RateBookHome from '../pages/RateBookHome';
import SearchResults from '../pages/SearchResults';
import Books from '../pages/Books';
import AboutUs from '../pages/AboutUs';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<RateBookHome />} />
                <Route path='/results' element={<SearchResults />} />
                <Route path='/books' element={<Books />} />
                <Route path='/about' element={<AboutUs />} />
            </Routes>
        </>
    )
}

export default AppRouter
