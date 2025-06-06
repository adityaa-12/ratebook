import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RateBookHome from '../pages/RateBookHome';
import SearchResults from '../pages/SearchResults';
import Books from '../pages/Books';
import AboutUs from '../pages/AboutUs';
import UserDashboard from '../pages/UserDashboard';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<RateBookHome />} />
                <Route path='/results' element={<SearchResults />} />
                <Route path='/books' element={<Books />} />
                <Route path='/about' element={<AboutUs />} />
                
                {/* Protected Client Links */}
                <Route path='/user-dashboard' element={<UserDashboard />} />
            </Routes>
        </>
    )
}

export default AppRouter
