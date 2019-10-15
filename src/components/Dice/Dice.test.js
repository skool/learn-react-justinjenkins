import React from 'react';
import ReactDOM from 'react-dom';
import Dice from './Dice';

it('renders #1 dice without crashing', () => {
  const div = document.createElement('div');
  const handleFreezeDice = () => {};
  ReactDOM.render(<Dice number={1} frozen={false} handleFreezeDice={handleFreezeDice} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
