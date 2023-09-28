import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { SignatureContextProvider } from './context/SignatureContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SignatureContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </SignatureContextProvider>
);

reportWebVitals();
