// Need to include this for ES2015+ features like
// Array.prototype.includes and async/await work
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './App/';

const rootElement = document.createElement("div");
ReactDOM.render(<App />, rootElement);
