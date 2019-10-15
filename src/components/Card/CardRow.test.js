import React from 'react';
import ReactDOM from 'react-dom';
import CardRow from './CardRow';

it('renders without crashing', () => {
  const setSlot = (slot,score) => { return null;};
  const table = document.createElement('tbody');
  ReactDOM.render(<CardRow name="Aces" number={1} setSlot={setSlot} />, table);
  ReactDOM.unmountComponentAtNode(table);
});
