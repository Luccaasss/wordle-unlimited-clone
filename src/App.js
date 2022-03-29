import React from 'react';
import Header from './components/header/Header';
import Word from './components/word/Word';
import './App.css'

const WORD_SIZE = 5;
const RIGHT_WORD = 'apple'

function App() {
  return (
    <div className='app__container'>
      <Header />
      <Word wordsize={WORD_SIZE} rightword={RIGHT_WORD} />
    </div>
  );
}

export default App;
