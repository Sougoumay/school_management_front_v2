import React from 'react';
import './App.css';

import MemberList from './components/MemberList';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the School Management App</h1>
        </header>
        <MemberList />
      </div>
  );
}

export default App;
