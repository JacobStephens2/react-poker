import './App.css';
import React, { useState } from 'react';
import FrenchDeck from './components/FrenchDeck.js';

function App() {
  const [chipsP1, setChipsP1] = useState(80);
  const [cardsP1, setCardsP1] = useState([]);
  const [chipsP2, setChipsP2] = useState(80);
  const [cardsP2, setCardsP2] = useState([]);
  const [deck, setDeck] = useState(FrenchDeck);
  const [communityCards, setCommunityCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [pot, setPot] = useState(0);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  function P1DrawOneCard() {
    let cardDrawn = getRandomIntInclusive(0, deck.length);
    setCardsP1([deck[cardDrawn].value + ' of ' + deck[cardDrawn].suit]);
  }

  function P1Bet() {
    setChipsP1(chipsP1 - 1);
    setPot(pot + 1);
  }

  function P2Bet() {
    setChipsP2(chipsP2 - 1);
    setPot(pot + 1);
  }

  function P2DrawOneCard() {
    let cardDrawn = getRandomIntInclusive(0, deck.length);
    setCardsP2([deck[cardDrawn].value + ' of ' + deck[cardDrawn].suit]);
  }

  return (
    <div className="App">
      <h1>Poker</h1>
      <div>Player {playerTurn}'s Turn</div>
      <div>Community Cards: {communityCards}</div>
      <div>Pot: ${pot}</div>
      <h2>Player 1</h2>
      <div>Chips: ${chipsP1}</div>
      <div>Cards: {cardsP1}</div>
      <button onClick={P1DrawOneCard}>Draw One Card</button>
      <button onClick={P1Bet}>Bet</button>
      <h2>Player 2</h2>
      <div>Chips: ${chipsP2}</div>
      <div>Cards: {cardsP2}</div>
      <button onClick={P2DrawOneCard}>Draw One Card</button>
      <button onClick={P2Bet}>Bet</button>
      <h2>Deck of {deck.length}</h2>
      <ul>{
        deck.map((card) =>
          <li key={card.id}>
            {card.value} of {card.suit}
          </li>
        )
      }</ul>
    </div>
  );
}

export default App;
