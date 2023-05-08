import React, { useEffect, useState } from 'react'
import '../styles/Header.scss'

function Header({title, titleNum, left, right}) {
  const [time, setTime] = useState("");

  useEffect (() =>{
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    if(hour<10){
      hour = "0" + hour 
    }
    if(minute<10){
      minute = "0" + minute
    }
    setTime(hour + ":" + minute);
  },[]);

  return (
    <header className='header Chatroom_header'>

      <div class="status_bar">
        <div class="left_item">
          <i class="fa-solid fa-plane"></i>
          <i class="fa-solid fa-wifi"></i>
        </div>
        <div class="center_item">
          <span>{time}</span>
        </div>
        <div class="right_item">
          <i class="fa-regular fa-moon"></i>
          <i class="fa-brands fa-bluetooth-b"></i>
          <span><span>100</span>%</span>
          <i class="fa-solid fa-battery-full"></i>
        </div>

        </div>
        <div class="title_bar">
          <h1>{title===undefined ? '' : title}<span>{titleNum===undefined ? '' : titleNum}</span></h1>
          <div class="left_item"><a href="/">{left===undefined ? '' : left}</a></div>
          <div class="right_item"><a href="/">{right===undefined ? '' : right}</a></div>
        </div>
      </header>
  )
}

export default Header