import React from 'react';
import ReactDOM from 'react-dom';
import TypoModal from './Modal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TypoModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
