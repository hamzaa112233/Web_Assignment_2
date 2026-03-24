import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import PowerBar from './PowerBar';
import GameField from './GameField';
import Controls from './Controls';

// 1. Define Probability Distributions [cite: 38, 39, 62]
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
  // Game State [cite: 33, 34, 35, 52]
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [style, setStyle] = useState('Aggressive');
  const [isBowling, setIsBowling] = useState(false);
  const [isHitting, setIsHitting] = useState(false); // Added for batting animation 
  const [gameOver, setGameOver] = useState(false);

  // 2. Logic to handle the shot with animation timing [cite: 48, 49, 120, 124]
  const handleHit = (sliderValue) => {
    // Prevent clicking while an animation is already in progress
    if (gameOver || isBowling || isHitting) return;

    // Start Bowling Animation: Ball begins traveling 
    setIsBowling(true);

    // Wait for the ball to "reach" the batsman (matches 1.2s CSS animation) [cite: 120, 124]
    setTimeout(() => {
      setIsBowling(false); // Ball has arrived
      setIsHitting(true);  // Trigger Batting Swing [cite: 49, 124]

      let cumulative = 0;
      const currentProbs = STYLES[style];
      let outcome = null;

      // Determine outcome based strictly on slider position [cite: 46, 47, 79, 80]
      for (let segment of currentProbs) {
        cumulative += segment.prob;
        if (sliderValue <= cumulative) {
          outcome = segment.label;
          break;
        }
      }

      // Update Game State based on the result [cite: 33, 34, 50, 53]
      if (outcome === 'Wicket') {
        setWickets(prev => prev + 1);
      } else {
        setScore(prev => prev + parseInt(outcome));
      }
      
      setBalls(prev => prev + 1);

      // End hitting animation after 500ms
      setTimeout(() => setIsHitting(false), 500);
    }, 1200); 
  };

  // Check for Game Over (Limit: 12 balls or 2 wickets) [cite: 24, 53, 83, 84]
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
      <Scoreboard score={score} wickets={wickets} balls={balls} />
      
      {/* Ensure GameField receives both animation states  */}
      <GameField isBowling={isBowling} isHitting={isHitting} />

      {!gameOver ? (
        <>
          <PowerBar segments={STYLES[style]} onHit={handleHit} />
          <Controls setStyle={setStyle} currentStyle={style} />
        </>
      ) : (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Final Score: {score}/{wickets}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;