import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from "nprogress";
import 'nprogress/nprogress.css';


const RouteChangeLoader: React.FC = () => {
    const location = useLocation();
    NProgress.configure({
        showSpinner: false,
    });

    useEffect(() => {
       NProgress.start();

       NProgress.done();

       return () => {
        NProgress.done();
       };

    }, [location]);

    return null;

}

export default RouteChangeLoader;
