import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const diceOnTable = {};
  const resetDice = () => {};
  const lockCard = () => {};
  ReactDOM.render(<Card diceOnTable={diceOnTable} resetDice={resetDice} locked={true} lockCard={lockCard} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
