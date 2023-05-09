import React, { useEffect, useState } from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import { Link } from 'react-router-dom';
import '../styles/Main.scss'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from 'fbase';
import emptyImage from '../images/empty.jpg'

function Main({me, user, userObj}) {

const [newMsg, setNewMsg] = useState("");

useEffect(() => {
  const q = query(collection(db, `${userObj.uid}`));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newArray = [];
    console.log(newArray)
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id})
    });
    setNewMsg(newArray[1]?.message);
  })

  },[newMsg])

  return (
    <div>
      <Header title={'친구'} titleNum={'5'} left={'Manage'} right={<i class="fa-solid fa-gear"></i>} />
        <main>
          <form action="/" class="srch_box">
            <fieldset class="srch_inner">
              <legend class="blind">검색</legend>
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" name="search" placeholder="친구, 플러스친구, 채팅 검색" autoComplete='off' />
            </fieldset>
          </form>
          <section class="main_section">
            <header><h2>내 프로필</h2></header>
              {me.map((me)=>(
                <ul>
                  <li><Link to='/myprofile'>
                    <img className='emptyImg' src={emptyImage} alt='기본 프로필 이미지' />
                    <span class="profile_img empty" style={{backgroundImage: `url(${userObj.photoURL})`}}></span>
                    <span class="profile_name">{userObj.displayName}</span>
                    <span className='profile_messages'>{newMsg}</span>
                  </Link></li>
                </ul>
              ))}
          </section>
          <section class="main_section">
            <header><h2>친구</h2></header>
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