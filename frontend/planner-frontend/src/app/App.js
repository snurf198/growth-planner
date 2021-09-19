import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Content />
    </div>
  );
};

export default App;