import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Routes from '../helpers/Routes';
import NavBar from '../components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfo = {
          fullName: authed.displayName,
          username: authed.email.split('@gmail.com')[0],
          uid: authed.uid
        };
        setUser(userInfo);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);
  return (
    <div className='App'>
     <Router>
        <NavBar user={user} />
        <Routes user={user} />
      </Router>
    </div>
  );
}

export default App;
