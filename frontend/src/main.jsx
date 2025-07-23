import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';        // ✅ import Provider
import store from './app/store';               // ✅ import your Redux store
import { setToken } from './app/features/auth/authSlice'; // ✅ This is correct *only if* setToken is exported properly
console.log(setToken); // Should log a function. If undefined, fix export.


const token = localStorage.getItem('token');
if (token) {
  store.dispatch(setToken(token));
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>                   {/* ✅ wrap App in Provider */}
       <BrowserRouter> {/* ✅ Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
