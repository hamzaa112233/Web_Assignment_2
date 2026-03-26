import './Controls.css';

const Controls = ({ setStyle, currentStyle }) => {
    return (
        <div className="controls-container">
            <button
                className={`style-btn btn-aggressive ${currentStyle === 'Aggressive' ? 'active' : ''}`}
                onClick={() => setStyle('Aggressive')}
            >
                Aggressive (High Risk/High Reward)
            </button>
            <button
                className={`style-btn btn-defensive ${currentStyle === 'Defensive' ? 'active' : ''}`}
                onClick={() => setStyle('Defensive')}
            >
                Defensive (Low Risk/Low Reward)
            </button>
        </div>
    );
};

export default Controls;