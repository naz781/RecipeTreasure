import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { AuthContextProvider } from './pages/context/AuthContext';  // Import AuthContextProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap the entire app in BrowserRouter */}
      <AuthContextProvider>  {/* Then wrap the app in AuthContextProvider */}
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
