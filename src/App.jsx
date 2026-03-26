import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import PowerBar from './PowerBar';
import GameField from './GameField';
import Controls from './Controls';
import './App.css';


const STYLES = {
  Aggressive: [
    { label: 'Wicket', prob: 0.40, color: 'red' },
    { label: '0', prob: 0.10, color: 'gray' },
    { label: '1', prob: 0.10, color: 'green' },
    { label: '2', prob: 0.10, color: 'yellow' },
    { label: '3', prob: 0.05, color: 'orange' },
    { label: '4', prob: 0.10, color: 'darkorange' },
    { label: '6', prob: 0.15, color: 'purple' },
  ],
  Defensive: [
    { label: 'Wicket', prob: 0.10, color: 'red' },
    { label: '0', prob: 0.30, color: 'gray' },
    { label: '1', prob: 0.30, color: 'green' },
    { label: '2', prob: 0.20, color: 'yellow' },
    { label: '3', prob: 0.05, color: 'orange' },
    { label: '4', prob: 0.03, color: 'darkorange' },
    { label: '6', prob: 0.02, color: 'purple' },
  ]
};

function App() {

  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [style, setStyle] = useState('Aggressive');
  const [isBowling, setIsBowling] = useState(false);
  const [isHitting, setIsHitting] = useState(false); 
  const [gameOver, setGameOver] = useState(false);

 
  const handleHit = (sliderValue) => {
   
    if (gameOver || isBowling || isHitting) return;

   
    setIsBowling(true);


    setTimeout(() => {
      setIsBowling(false); 
      setIsHitting(true); 

      let cumulative = 0;
      const currentProbs = STYLES[style];
      let outcome = null;

      
      for (let segment of currentProbs) {
        cumulative += segment.prob;
        if (sliderValue <= cumulative) {
          outcome = segment.label;
          break;
        }
      }

     
      if (outcome === 'Wicket') {
        setWickets(prev => prev + 1);
      } else {
        setScore(prev => prev + parseInt(outcome));
      }
      
      setBalls(prev => prev + 1);

     
      setTimeout(() => setIsHitting(false), 500);
    }, 1200); 
  };

  
  useEffect(() => {
    if (balls >= 12 || wickets >= 2) {
      setGameOver(true);
    }
  }, [balls, wickets]);

  const restartGame = () => {
    setScore(0);
    setWickets(0);
    setBalls(0);
    setGameOver(false);
    setStyle('Aggressive');
  };

  return (
  <div className="app-container">
    {/* 1. Standard Game UI */}
    <Scoreboard score={score} wickets={wickets} balls={balls} /> 
    <GameField isBowling={isBowling} isHitting={isHitting} />

    {!gameOver ? (
      <>
        {/* Only show these while the game is active */}
        <PowerBar segments={STYLES[style]} onHit={handleHit} /> 
        <Controls setStyle={setStyle} currentStyle={style} /> 
      </>
    ) : null}

    {/* 2. ADD THE GAME OVER OVERLAY HERE */}
    {gameOver && (
      <div className="game-over-overlay">
        <div className="game-over-content">
          <h1 className="game-over-title">MATCH FINISHED!</h1>
          <div className="final-score-box">
            <p className="final-score-label">Final Score</p>
            <h2 className="final-score-text">{score} / {wickets}</h2> 
            <p className="final-overs-text">
              Overs: {Math.floor(balls / 6)}.{balls % 6}
            </p>
          </div>
          <button className="restart-btn" onClick={restartGame}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default App;