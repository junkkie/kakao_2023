import { useState, useEffect } from 'react';
import { auth } from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

import AppRouter from 'AppRouter';

import users from 'data/users.json'
import me from 'data/me.json'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
library.add(fas, faGithub, faGoogle)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj,setUserObj] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <>
    {init ?
    (
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} user={users} me={me} />
    ):(
      "initializing..."
    )}
    </>
  );
}

export default App;