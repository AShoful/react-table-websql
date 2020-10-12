import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { ItemsProvider } from './Context/ItemsContext';

const app = (
  <BrowserRouter>
    <UserProvider>
      <ItemsProvider>
        <App />
      </ItemsProvider>
    </UserProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
