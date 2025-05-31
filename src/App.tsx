import React from 'react'
import AppRouter from './router/AppRouter';
import Header from './pages/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <AppRouter />
    </div>
  )
}

export default App;
