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
  const [pot, setPot] = useState(0);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    // The maximum and minimum are both inclusive
  }

  function P1DrawOneCard() {
    let cardDrawn = getRandomIntInclusive(0, deck.length);
    let newCard = deck[cardDrawn];
    setDeck(deck.filter(deck => deck.id != newCard.id))
    setCardsP1(deck => [...deck, newCard]);
  }

  function P2DrawOneCard() {
    let cardDrawn = getRandomIntInclusive(0, deck.length);
    let newCard = deck[cardDrawn];
    setDeck(deck.filter(deck => deck.id != newCard.id))
    setCardsP2(deck => [...deck, newCard]);
  }

  function drawCommunityCard() {
    let cardDrawn = getRandomIntInclusive(0, deck.length);
    let newCard = deck[cardDrawn];
    setDeck(deck.filter(deck => deck.id != newCard.id))
    setCommunityCards(deck => [...deck, newCard]);
  }

  function P1Bet() {
    setChipsP1(chipsP1 - 1);
    setPot(pot + 1);
  }

  function P2Bet() {
    setChipsP2(chipsP2 - 1);
    setPot(pot + 1);
  }


  return (
    <div className="App">

      <h1>Poker</h1>

      <div>{communityCards.length} Community Cards</div>
      <button onClick={drawCommunityCard}>Draw One Card</button>
      <ul>{
        communityCards.map((card) =>
          <li key={card.id}>
            {card.value} of {card.suit}
          </li>
        )
      }</ul>
      <div>Pot: ${pot}</div>

      <h2>Player 1</h2>
      <div>Chips: ${chipsP1}</div>
      <button onClick={P1DrawOneCard}>Draw One Card</button>
      <button onClick={P1Bet}>Bet $1</button>
      <div>{cardsP1.length} Card Hand</div>
      <ul>{
        cardsP1.map((card) =>
          <li key={card.id}>
            {card.value} of {card.suit}
          </li>
        )
      }</ul>

      <h2>Player 2</h2>
      <div>Chips: ${chipsP2}</div>
      <button onClick={P2DrawOneCard}>Draw One Card</button>
      <button onClick={P2Bet}>Bet $1</button>
      <div>{cardsP2.length} Card Hand</div>
      <ul>{
        cardsP2.map((card) =>
          <li key={card.id}>
            {card.value} of {card.suit}
          </li>
        )
      }</ul>

      <h2>{deck.length} Card Deck</h2>
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
