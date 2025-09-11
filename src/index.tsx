import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp, DocumentSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import { AuthProvider } from './context/AuthContext';

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
