import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './static/css/borders.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename='astrophotography-by-patryk-tomalik'>
    <App />
  </Router>
);
