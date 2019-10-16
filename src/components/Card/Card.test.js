import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const diceOnTable = {};
  const resetDice = () => {};
  ReactDOM.render(<Card diceOnTable={diceOnTable} resetDice={resetDice} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
