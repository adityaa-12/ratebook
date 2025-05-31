import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RateBookHome from '../pages/RateBookHome';
import SearchResults from '../pages/SearchResults';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<RateBookHome />} />
                <Route path='/results' element={<SearchResults />} />
            </Routes>
        </>
    )
}

export default AppRouter
