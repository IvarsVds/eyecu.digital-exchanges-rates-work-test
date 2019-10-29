import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/modern-normalize/modern-normalize.css';
import './index.css';
import App from './components/App/App';

ReactDOM.hydrate(<App />, document.getElementById('root'));