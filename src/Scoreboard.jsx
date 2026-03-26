import './Scoreboard.css';

const Scoreboard = ({ score, wickets, balls }) => {
  const overs = Math.floor(balls / 6);
  const remainingBalls = balls % 6;

  return (
    <div className="scoreboard">
      <h2>Score: {score} / {wickets}</h2>
      <p>Overs: {overs}.{remainingBalls} (Target: 2.0)</p>
    </div>
  );
};

export default Scoreboard;