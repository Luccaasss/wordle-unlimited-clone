import React, { useState, useEffect } from 'react'
import './word.css'

function CurrentWordRow(props) {
  return (
    Array.from({ length: 5 }).map((_, i) => (
      <div
        className='word__letter' key={i}>{props.inputKeyToArray[i] || ''}
      </div>
    ))
  )
}

function GuessedWord(props) {
  const arrayRightAns = props.rightword.split('')

  return (
    Array.from({ length: 5 }).map((_, i) => (
      <div
        className={
          `word__letter 
          ${(arrayRightAns[i] === props.inputKeyToArray[i] ? 'wrod__letter-right' : '')}
          ${(!(props.rightword).includes(props.inputKeyToArray[i])) ? 'wrod__letter-absent' : ''}
          ${((props.rightword).includes(props.inputKeyToArray[i]) && arrayRightAns[i] !== props.inputKeyToArray[i]) ? 'wrod__letter-present' : ''}
          `
        }
        key={i}>{props.inputKeyToArray[i] || ''}</div>
    ))
  )
}

function EmptyWrodRow() {
  return (
    Array.from({ length: 5 }).map((_, i) => <div className='word__letter' key={i}>{''}</div>)
  )
}

export default function Word(props) {
  const {
    wordsize,
    rightword
  } = props

  const [inputKeyToArray, setInputToArray] = useState([])
  const [arrayGuessedWord, setArrayGuessedWord] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyInput);
    return () => {
      window.removeEventListener('keydown', handleKeyInput)
    }
  }, [inputKeyToArray])

  function handleKeyInput(event) {
    const isBackspace = event.key === 'Backspace';
    const isEnter = event.key === 'Enter';
    const isLetter = (/[a-zA-Z]/).test(event.key);
    const newArray = [...inputKeyToArray]

    if (isEnter && inputKeyToArray.length >= wordsize) {
      setCurrentRow(prev => prev + 1);
      setArrayGuessedWord(prev => [...prev, inputKeyToArray])
      setInputToArray([])
    }
    if (inputKeyToArray.length >= wordsize && !isBackspace) return;
    if (isBackspace && inputKeyToArray.length >= 0) {
      newArray.pop();
      setInputToArray(newArray)
    }
    else if (isLetter && event.key.length === 1) setInputToArray(prev => [...prev, event.key])
  }

  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        if (arrayGuessedWord[i]) return <div key={i} className='word__container'><GuessedWord rightword={rightword} inputKeyToArray={arrayGuessedWord[i]} /></div>
        return (
          <div key={i} className='word__container'>
            {(i === currentRow) ? <CurrentWordRow inputKeyToArray={inputKeyToArray} /> : <EmptyWrodRow />}
          </div>
        )
      })}
    </>
  )
}
