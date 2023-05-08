import React from 'react'
import Header from './../components/Header';
import Tab from './../components/Tab';
import '../styles/Find.scss'

function Find() {
  return (
    <div>
      <Header title={'찾기'} left={'Edit'}/>
      <main>
        <ul class="find_method">
          <li><a href="#"><i class="fa-solid fa-address-book"></i>찾기</a></li>
          <li><a href="#"><i class="fa-solid fa-qrcode"></i>QR코드</a></li>
          <li><a href="#"><i class="fa-solid fa-mobile-screen-button"></i>흔들기</a></li>
          <li><a href="#"><i class="fa-regular fa-envelope"></i>문자로 초대하기</a></li>
        </ul>
      </main>

      <div class="recommend_section">
        <header><h2>추천 친구</h2></header>
        <ul>
          <li>추천 친구가 비활성화되었습니다.</li>
        </ul>
      </div>
      <Tab />
    </div>
  )
}

export default Find