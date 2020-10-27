import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Manager from './Stores/Manager'
import ServiceProvider from './Stores/ServiceProvider'
import './index.css';

const manager = new Manager();
const serviceProvider = new ServiceProvider();

const stores = { manager, serviceProvider }

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
