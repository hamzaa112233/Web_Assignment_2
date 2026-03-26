import React from 'react';
import './GameField.css';

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

   
      <img 
        src={isHitting ? batsmanHit : batsmanReady} 
        alt="Batsman" 
        className={`batsman-sprite ${isHitting ? 'hit-animation' : ''}`} 
      />

    
      <img 
        src={ballImg} 
        alt="Ball" 
        className={`ball-sprite ${isBowling ? 'bowling-animation' : ''}`} 
      />
    </div>
  );
};

export default GameField;