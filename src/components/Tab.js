import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Tab.scss'

function Tab() {
  return (
    <nav class="tab_bar">
      <ul>
      <li><Link to='/'><i class="fa-solid fa-user"></i>Friends</Link></li>
      <li><Link to='/chats'><i class="fa-solid fa-comment"></i>Chats</Link></li>
      <li><Link to='/find'><i class="fa-solid fa-magnifying-glass"></i>Find</Link></li>
      <li><Link to='/more'><i class="fa-solid fa-ellipsis"></i>More</Link></li>
      </ul> 
    </nav>
  )
}

export default Tab