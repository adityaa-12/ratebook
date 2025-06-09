import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';


const AppLayout: React.FC = () => {
    return (
        <div className='w-[85vw] mx-auto max-sm:w-[95vw]'>
            <Header />
            <Outlet />
        </div>
    )
}

export default AppLayout
