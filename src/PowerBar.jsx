import React, { useState, useEffect, useRef } from 'react';
import './PowerBar.css';

const PowerBar = ({ segments, onHit }) => {
    const [sliderPos, setSliderPos] = useState(0);
    const requestRef = useRef();

   
    const animateSlider = (time) => {
        setSliderPos(prev => (prev >= 1 ? 0 : prev + 0.01));
        requestRef.current = requestAnimationFrame(animateSlider);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animateSlider);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div className="power-bar-wrapper">
            <div className="power-bar-container" style={{ display: 'flex', height: '40px', width: '100%', position: 'relative' }}>
                {segments.map((s, i) => (
                    <div key={i} style={{
                        width: `${s.prob * 100}%`,
                        backgroundColor: s.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px'
                    }}>
                        {s.label}
                    </div>
                ))}
               
                <div className="slider" style={{
                    position: 'absolute',
                    left: `${sliderPos * 100}%`,
                    width: '5px',
                    height: '100%',
                    backgroundColor: 'white',
                    border: '1px solid black'
                }} />
            </div>
            <button className="hit-btn" onClick={() => onHit(sliderPos)}>
                HIT!
            </button>
        </div>
    );
};

export default PowerBar;