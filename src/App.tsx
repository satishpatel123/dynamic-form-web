import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContainer from './components/MainCointainer';
import AppRoutes from './components/AppRoutes';


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <MainContainer>
            <AppRoutes />
          </MainContainer>
        </div>
      </div>
    </Router>
  );
};

export default App;
