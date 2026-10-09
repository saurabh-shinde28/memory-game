import { useState } from "react";

const shuffleArray = (array) => {
  const shuffle = [...array];
  for (let i = shuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
  }

  return shuffle;
};

const createGame = (cardValues) => {
  return shuffleArray(cardValues).map((card, index) => {
    return {
      id: index,
      value: card,
      isFlipped: false,
      isMatched: false,
    };
  });
};

export const useGameLogic = ({ cardValues }) => {
  const [cards, setCards] = useState(() => createGame(cardValues));
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const resetGame = () => {
    setCards(createGame(cardValues));
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  function handleCardClick(card) {
    // check if card is already flipped || matched

    if (card.flipped || card.matched || flippedCards.length == 2) return;

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
        setTimeout(() => {
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
          setFlippedCards([]);
        }, 300);
      } else {
        setTimeout(() => {
          const flipBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id == card.id) {
              return { ...c, isFlipped: false };
            } else return c;
          });

          setCards(flipBackCard);
          setFlippedCards([]);
        }, 500);
      }

      setMoves((prev) => prev + 1);
    }
  }

  const isGameComplete = matchedCards.length == cardValues.length;

  return {
    score,
    cards,
    moves,
    isGameComplete,
    resetGame,
    handleCardClick,
  };
};
