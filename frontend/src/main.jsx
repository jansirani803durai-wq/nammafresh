import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.jsx';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';


AOS.init({ duration: 850, once: true, offset: 80, easing: 'ease-out-cubic' });

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
