import Card from "./components/Card";
import GameHeader from "./components/GameHeader";
import WinningCard from "./components/WinningCard";
import { useGameLogic } from "./hooks/useGameLogic";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🍊",
  "🍋",
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🍊",
  "🍋",
];

const App = () => {
  const { score, moves, isGameComplete, resetGame, handleCardClick, cards } =
    useGameLogic({ cardValues });
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={resetGame} />

      {isGameComplete && <WinningCard moves={moves} />}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
