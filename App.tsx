
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import LandingPage from './components/LandingPage';
import EditorPage from './components/EditorPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white">
      {currentPage === Page.LANDING ? (
        <LandingPage onEnterEditor={() => setCurrentPage(Page.EDITOR)} />
      ) : (
        <EditorPage onExit={() => setCurrentPage(Page.LANDING)} />
      )}
    </div>
  );
};

export default App;
