import './App.css';
import React, { useState, useEffect } from 'react';
import FrenchDeck from './FrenchDeck.js';

function App() {
  const [chipsP1, setChipsP1] = useState(80);
  const [cardsP1, setCardsP1] = useState([]);
  const [chipsP2, setChipsP2] = useState(80);
  const [cardsP2, setCardsP2] = useState([]);
  const [deck, setDeck] = useState(FrenchDeck);
  const [communityCards, setCommunityCards] = useState([]);
  const [pot, setPot] = useState(0);
  const [deckVisibility, setDeckVisibility] = useState('none');
  const [p1HandVisibility, setP1HandVisibility] = useState('none');
  const [p2HandVisibility, setP2HandVisibility] = useState('none');

  function P1DrawOneCard() {
    let newCard = deck[0];
    setDeck(deck.filter(deck => deck.id !== newCard.id))
    setCardsP1(deck => [...deck, newCard]);
  }

  function P2DrawOneCard() {
    let newCard = deck[0];
    setDeck(deck.filter(deck => deck.id !== newCard.id))
    setCardsP2(deck => [...deck, newCard]);
  }

  function drawCommunityCard() {
    let newCard = deck[0];
    setDeck(deck.filter(deck => deck.id !== newCard.id))
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

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // shuffle deck on page load
  useEffect(() => {
    const mountArray = shuffle([...deck]);
    setDeck(mountArray);
  }, []);

  function handleShuffle() {
    const shuffledDeck = shuffle([...deck]);
    setDeck(shuffledDeck);
  }

  function gatherCards() {
    setDeck(shuffle(FrenchDeck));
    setCommunityCards([]);
    setCardsP1([]);
    setCardsP2([]);
  }

  function P1TakePot() {
    setChipsP1(pot + chipsP1);
    setPot(0);
  }

  function P2TakePot() {
    setChipsP2(pot + chipsP2);
    setPot(0);
  }

  function resetChips() {
    setPot(0);
    setChipsP1(80);
    setChipsP2(80);
  }

  function revealDeck() {
    setDeckVisibility('block');
  }
  function concealDeck() {
    setDeckVisibility('none');
  }

  function revealP1Hand() {
    setP1HandVisibility('block');
  }
  function concealP1Hand() {
    setP1HandVisibility('none');
  }

  function revealP2Hand() {
    setP2HandVisibility('block');
  }
  function concealP2Hand() {
    setP2HandVisibility('none');
  }

  return (
    <div className="App">

      <section className="overview">
        <h1>React Poker</h1>
        <button onClick={resetChips}>Reset Chips</button>
      </section>

      <section className="playArea">

        <section>
          <h2>Board</h2>
          <p>Pot: ${pot}</p>
          <button onClick={drawCommunityCard}>Draw One Card</button>
          <div>
            {communityCards.length} Community Card{communityCards.length === 1 ? '' : 's'}
          </div>
          <ul>{
            communityCards.map((card) =>
              <li key={card.id}>
                {card.value} of {card.suit}
              </li>
            )
          }</ul>
        </section>

        <section>
          <h2>Player 1</h2>
          <p>Chips: ${chipsP1}</p>
          <button onClick={P1Bet}>Bet $1</button>
          <button onClick={P1TakePot}>Take Pot</button>
          <p>{cardsP1.length} Card Hand</p>
          <button onClick={P1DrawOneCard}>Draw One Card</button>
          {
            p1HandVisibility == 'none'
              ? <button onClick={revealP1Hand}>Reveal Hand</button>
              : <button onClick={concealP1Hand}>Conceal Hand</button>
          }
          <ul style={{ display: p1HandVisibility }}> {
            cardsP1.map((card) =>
              <li key={card.id}>
                {card.value} of {card.suit}
              </li>
            )
          }</ul>
        </section>

        <section>
          <h2>Player 2</h2>
          <p>Chips: ${chipsP2}</p>
          <button onClick={P2Bet}>Bet $1</button>
          <button onClick={P2TakePot}>Take Pot</button>
          <p>{cardsP2.length} Card Hand</p>
          <button onClick={P2DrawOneCard}>Draw One Card</button>
          {
            p2HandVisibility == 'none'
              ? <button onClick={revealP2Hand}>Reveal Hand</button>
              : <button onClick={concealP2Hand}>Conceal Hand</button>
          }
          <ul style={{ display: p2HandVisibility }}> {
            cardsP2.map((card) =>
              <li key={card.id}>
                {card.value} of {card.suit}
              </li>
            )
          }</ul>
        </section>

        <section>
          <h2>{deck.length} Card Deck</h2>
          <button onClick={handleShuffle}>Shuffle</button>
          <button onClick={gatherCards}>Gather Cards</button>
          {
            deckVisibility == 'none'
              ? <button onClick={revealDeck}>Reveal Deck</button>
              : <button onClick={concealDeck}>Conceal Deck</button>
          }
          <ul style={{ display: deckVisibility }}>{
            deck.map((card) =>
              <li key={card.id}>
                {card.value} of {card.suit}
              </li>
            )
          }</ul>
        </section>

      </section>


    </div >
  );
}

export default App;
