import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './routes/Main';
import Chatroom from './routes/Chatroom';
import Chats from './routes/Chats';
import Find from './routes/Find';
import More from './routes/More';
import Profile from './routes/Profile';
import Auth from './routes/Auth';
import MyProfile from './routes/MyProfile';

function AppRouter({isLoggedIn, userObj, me, user}) {

  return (
    <BrowserRouter>
      <Routes isLoggedIn={isLoggedIn}>
        {isLoggedIn ?
        (<Route path="/" element={<Main me={me} user={user} userObj={userObj}/>} />)
        :
        (<Route path="/" element={<Auth />} />)
        }
        <Route path="/chatroom" element={<Chatroom user={user} me={me} userObj={userObj} />}/>
        <Route path="/chats" element={<Chats user={user} />}/>
        <Route path="/find" element={<Find />}/>
        <Route path="/more" element={<More me={me} />}/>
        <Route path="/profile" element={<Profile user={user} />}/>
        <Route path='/myprofile' element={<MyProfile me={me} userObj={userObj} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter