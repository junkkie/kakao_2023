import React, { useEffect, useState } from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import { Link } from 'react-router-dom';
import '../styles/Main.scss'

function Main({me, user, userObj}) {

  return (
    <div>
      <Header title={'Friends'} titleNum={'5'} left={'Manage'} right={<i class="fa-solid fa-gear"></i>} />
        <main>
          <form action="/" class="srch_box">
            <fieldset class="srch_inner">
              <legend class="blind">검색</legend>
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" name="search" placeholder="Find friends, chats, Plus friends" />
            </fieldset>
          </form>
          <section class="main_section">
            <header><h2>My Profile</h2></header>
              {me.map((me)=>(
                <ul>
                  <li><Link to='/myprofile'>
                    <span class="profile_img empty" style={{backgroundImage: `url(${userObj.profileUrl})`}}></span>
                    <span class="profile_name">{userObj.displayName}</span>
                    <span className='profile_messages'>{me.msg}</span>
                  </Link></li>
                </ul>
              ))}
          </section>
          <section class="main_section">
            <header><h2>Friends</h2></header>
              <ul>
              {user.map((user)=>(
                    <li key={user.id}><Link to='/profile' state={user}>
                    <span class="profile_img empty" style={{backgroundImage: `url(${user.imgs})`}}></span>
                    <span class="profile_name">{user.name}</span>
                    <span className='profile_messages'>{user.msg}</span>
                  </Link></li>
              ))}
            </ul>
          </section>
        </main>
      <Tab /> 
    </div>
  )
}

export default Main