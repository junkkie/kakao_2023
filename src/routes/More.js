import React from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import '../styles/More.scss'
import { Link } from 'react-router-dom';

function More({me, userObj}) {
  return (
    <div>
      <Header right={<i class="fa-solid fa-gear"></i>}/>
        <main>            
          {me.map((me)=>(
              <Link to='/myprofile'>
                <section class="user_info">
                  <h2 class="blind">사용자 정보</h2>
                  <span class="profile_img empty" style={{backgroundImage: `url(${userObj.photoURL})`}}></span>
                  <span class="profile_info">
                    <span class="profile_name">{userObj.displayName}</span>
                    <span class="profile_email">{userObj.email}</span>
                  </span>
                  <span class="chat_img"><a href="#">logo</a></span>
                </section>
              </Link>
          ))}


          <section class="user_menu">
            <h2 class="blind">사용자 메뉴</h2>
            <ul>
              <li><a href="#"><i class="fa-regular fa-face-smile"></i>이모티콘</a></li>
              <li><a href="#"><i class="fa-solid fa-paintbrush"></i>테마샵</a></li>
              <li><a href="#"><i class="fa-regular fa-hand-peace"></i>플러스친구</a></li>
              <li><a href="#"><i class="fa-regular fa-circle-user"></i>계정</a></li>
            </ul>
          </section>

          <section class="plus_friends">
            <header>
              <h2>플러스</h2>
              <span><i class="fa-solid fa-circle-info"></i>더보기</span>
            </header>
            <ul class="plus_list">
              <li><a href="#"><i class="fa-solid fa-utensils"></i>주문</a></li>
              <li><a href="#"><i class="fa-solid fa-house"></i>스토어</a></li>
              <li><a href="#"><i class="fa-solid fa-tv"></i>TV채널/라디오</a></li>
              <li><a href="#"><i class="fa-solid fa-pencil"></i>제작</a></li>
              <li><a href="#"><i class="fa-solid fa-graduation-cap"></i>교육</a></li>
              <li><a href="#"><i class="fa-solid fa-landmark"></i>정치/사회</a></li>
              <li><a href="#"><i class="fa-solid fa-won-sign"></i>금융</a></li>
              <li><a href="#"><i class="fa-solid fa-video"></i>영화/음악</a></li>
            </ul>
          </section>

          <section class="more_app">
            <h2 class="blind">더보기</h2>
            <ul>
              <li><a href="#"><span class="app_icon"></span>Kakao Story</a></li>
              <li><a href="#"><span class="app_icon"></span>Path</a></li>
              <li><a href="#"><span class="app_icon"></span>Kakao friends</a></li>
            </ul>
          </section>
        </main>
      <Tab />
    </div>
  )
}

export default More