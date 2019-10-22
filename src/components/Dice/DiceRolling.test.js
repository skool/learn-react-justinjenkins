import React from 'react';
import ReactDOM from 'react-dom';
import DiceRolling from './DiceRolling';

it('renders #1 dice without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DiceRolling spin={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
