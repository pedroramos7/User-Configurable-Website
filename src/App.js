import React from 'react';
import './App.css';
import UserForm from './Components/UserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Configurable Site</h1>
      </header>
      <main>
        <UserForm />
      </main>
    </div>
  );
}

export default App;
