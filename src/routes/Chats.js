import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import '../styles/Chats.scss'
import { Link } from 'react-router-dom';

function Chats({user}) {
  
  return (
    <div>
      <Header title={'chats'} left={'Edit'} />
        <main>
          <form action="/" class="srch_box">
            <fieldset class="srch_inner">
              <legend class="blind">검색</legend>
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" name="search" placeholder="Find friends, chats, Plus friends" />
            </fieldset>
          </form>

          <section class="main_section">
            <header class="blind"><h2>Chats</h2></header>
            <ul>
            {user.map((user)=>(
              <li><Link to='/chatroom' state={user}>
                <span class="chats_img empty" style={{backgroundImage: `url(${user.imgs})`}}></span>
                <span class="chats_cont">
                  <span class="chats_name">{user.name}</span>
                  <span class="chats_messages">{user.chats[2]}</span>
                </span>
                <span class="chats_time"><span>17</span>:<span>33</span></span>
              </Link></li>
              ))}
            </ul>
          </section>

          <div class="chat_fa_btn">
            <a href="#">
              <i class="fa-solid fa-comment"></i>
            </a>
          </div>
        </main>
      <Tab />
    </div>
  )
}

export default Chats