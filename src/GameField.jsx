import React from 'react';
import './GameField.css';
// 1. Import BOTH batsman sprites and other assets [cite: 32]
import batsmanReady from './assets/batsman_1.jpg'; 
import batsmanHit from './assets/batsman_2.jpg';
import ballImg from './assets/ball.jpg';
import stadiumImg from './assets/stadium.jpg';

const GameField = ({ isBowling, isHitting }) => {
  return (
    <div className="cricket-field" style={{ 
      backgroundImage: `url(${stadiumImg})`, 
      backgroundSize: 'cover'
    }}>
      <div className="pitch" />

      {/* 2. Conditional Rendering for the Batsman Sprite [cite: 49, 120] */}
      <img 
        src={isHitting ? batsmanHit : batsmanReady} 
        alt="Batsman" 
        className={`batsman-sprite ${isHitting ? 'hit-animation' : ''}`} 
      />

      {/* Ball Sprite [cite: 32, 48] */}
      <img 
        src={ballImg} 
        alt="Ball" 
        className={`ball-sprite ${isBowling ? 'bowling-animation' : ''}`} 
      />
    </div>
  );
};

export default GameField;