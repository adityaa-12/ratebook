import React from 'react'
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import RouteChangeLoader from './components/RouteChangeLoader';
import AppLayout from './pages/AppLayout';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
        <RouteChangeLoader />
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App;
