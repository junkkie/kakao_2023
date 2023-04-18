import React from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import '../styles/Find.scss'

function Find() {
  return (
    <div>
      <Header title={'Find'} left={'Edit'}/>
      <main>
        <ul class="find_method">
          <li><a href="#"><i class="fa-solid fa-address-book"></i>Find</a></li>
          <li><a href="#"><i class="fa-solid fa-qrcode"></i>QR Code</a></li>
          <li><a href="#"><i class="fa-solid fa-mobile-screen-button"></i>Shake</a></li>
          <li><a href="#"><i class="fa-regular fa-envelope"></i>Invite via SMS</a></li>
        </ul>
      </main>

      <div class="recommend_section">
        <header><h2>Recommended Friends</h2></header>
        <ul>
          <li>You Have no Recommended friends.</li>
        </ul>
      </div>
      <Tab />
    </div>
  )
}

export default Find