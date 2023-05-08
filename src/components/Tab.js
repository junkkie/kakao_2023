import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tab.scss'

function Tab() {
  return (
    <nav class="tab_bar">
      <ul>
      <li><Link to='/'>친구</Link></li>
      <li><Link to='/chats'>채팅</Link></li>
      <li><Link to='/find'>찾기</Link></li>
      <li><Link to='/more'>더보기</Link></li>
      </ul> 
    </nav>
  )
}

export default Tab