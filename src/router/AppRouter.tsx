import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RateBookHome from '../pages/RateBookHome';
import SearchResults from '../pages/SearchResults';
import Books from '../pages/Books';
import AboutUs from '../pages/AboutUs';
import UserDashboard from '../pages/UserDashboard';
import NotFound from '../pages/NotFound';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                {/* Not Found Route */}
                <Route path='*' element={<NotFound />} />
                {/* Global Routes */}
                <Route path='/' element={<RateBookHome />} />
                <Route path='/results' element={<SearchResults />} />
                <Route path='/books' element={<Books />} />
                <Route path='/about' element={<AboutUs />} />

                {/* Protected Client Links */}
                <Route path='/v2/dashboard' element={<UserDashboard />} />
            </Routes>
        </>
    )
}

export default AppRouter
