import { useState } from "react";
import Card from "./components/Card";
import GameHeader from "./components/GameHeader";

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

const createGame = () => {
  return cardValues.map((card, index) => {
    return {
      id: index,
      value: card,
      isFlipped: false,
      isMatched: false,
    };
  });
};

const App = () => {
  const [cards, setCards] = useState(createGame());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const resetGame = () => {
    setCards(createGame());
    setScore(0);
    setMoves(0);
  };

  function handleCardClick(card) {
    // check if card is already flipped || matched

    if (card.flipped || card.matched) return;

    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else return c;
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // check for match for flipped cards;

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        setScore((prev) => prev + 1);
        setCards((prev) =>
          prev.map((c) => {
            if (c.id == card.id || c.id == firstCard.id) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          }),
        );
      }
    }
  }

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={resetGame} />

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
