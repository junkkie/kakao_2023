import React from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import '../styles/More.scss'

function More({me}) {
  return (
    <div>
      <Header right={<i class="fa-solid fa-gear"></i>}/>
        <main>            
          {me.map((me)=>(
              <section class="user_info">
                <h2 class="blind">사용자 정보</h2>
                <span class="profile_img empty" style={{backgroundImage: `url(${me.imgs})`}}></span>
                <span class="profile_info">
                  <span class="profile_name">{me.name}</span>
                  <span class="profile_email">{me.email}</span>
                </span>
                <span class="chat_img"><a href="#"><i class="fa-regular fa-comment"></i></a></span>
              </section>
          ))}


          <section class="user_menu">
            <h2 class="blind">사용자 메뉴</h2>
            <ul>
              <li><a href="#"><i class="fa-regular fa-face-smile"></i>Emoticons</a></li>
              <li><a href="#"><i class="fa-solid fa-paintbrush"></i>Themes</a></li>
              <li><a href="#"><i class="fa-regular fa-hand-peace"></i>Plus Friend</a></li>
              <li><a href="#"><i class="fa-regular fa-circle-user"></i>Account</a></li>
            </ul>
          </section>

          <section class="plus_friends">
            <header>
              <h2>Plus Friends</h2>
              <span><i class="fa-solid fa-circle-info"></i> Learn More</span>
            </header>
            <ul class="plus_list">
              <li><a href="#"><i class="fa-solid fa-utensils"></i>Order</a></li>
              <li><a href="#"><i class="fa-solid fa-house"></i>Store</a></li>
              <li><a href="#"><i class="fa-solid fa-tv"></i>TV Channel/Radio</a></li>
              <li><a href="#"><i class="fa-solid fa-pencil"></i>Creation</a></li>
              <li><a href="#"><i class="fa-solid fa-graduation-cap"></i>Education</a></li>
              <li><a href="#"><i class="fa-solid fa-landmark"></i>Politics/Society</a></li>
              <li><a href="#"><i class="fa-solid fa-won-sign"></i>Finance</a></li>
              <li><a href="#"><i class="fa-solid fa-video"></i>Movies/Music</a></li>
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