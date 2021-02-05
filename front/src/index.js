import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,   //<<----- BrowserRouter pakeistas i HashRouter
} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
