import React from 'react';
import ReactDOM from 'react-dom';
import DiceSet from './DiceSet';

it('renders dice without crashing', () => {
  const div = document.createElement('div');
  const handleFreezeDice = () => {};
  ReactDOM.render(<DiceSet diceOnTable={{}} rolling={true} handleFreezeDice={handleFreezeDice} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
