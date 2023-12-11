import React, { useEffect, useState } from 'react';
import Pokemones from './components/Pokemones';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('usuario'));
      if (userFromLocalStorage) {
        setFirebaseUser(userFromLocalStorage);
      } else {
        auth.onAuthStateChanged(user => {
          if (user) {
            setFirebaseUser(user);
            localStorage.setItem('usuario', JSON.stringify(user));
          } else {
            setFirebaseUser(null);
            localStorage.removeItem('usuario');
          }
        });
      }
    };

    fetchUser();
  }, []);

  const RutaProtegida = ({ element }) => {
    if (!firebaseUser) {
      return <Navigate to="/login" />;
    }

    return element;
  };

  return (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Routes>
          <Route path="/" element={<RutaProtegida element={<Pokemones />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
