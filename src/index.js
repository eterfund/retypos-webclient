// Need to include this for ES2015+ features like
// Array.prototype.includes and async/await work
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/';

const rootElement = document.createElement("div");
rootElement.id = "es-typos-root";

document.body.appendChild(rootElement);

ReactDOM.render(<App />, rootElement);
