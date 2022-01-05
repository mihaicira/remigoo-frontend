import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {AccountProvider} from "./Components/AccountContext/AccountProvider";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <AccountProvider>
            <App />
          </AccountProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
