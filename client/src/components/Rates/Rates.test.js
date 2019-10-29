import React from 'react';
import ReactDOM from 'react-dom';
import Rates from './Rates';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rates />, div);
  ReactDOM.unmountComponentAtNode(div);
});
