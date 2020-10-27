import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './App';
import AuthConfig from '../config/AuthConfig';
import { Amplify } from 'aws-amplify';
import reportWebVitals from './reportWebVitals';
import Manager from './Stores/Manager';
import ServiceProvider from './Stores/ServiceProvider';
import './index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: AuthConfig.cognito.REGION,
    userPoolId: AuthConfig.cognito.USER_POOL_ID,
    identityPoolId: AuthConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: AuthConfig.cognito.APP_CLIENT_ID
  },
});

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
