import { Link, useLocation } from 'react-router-dom';
import '../styles/Profile.scss'

function Profile() {
  const location = useLocation();
  const user = location.state;

  return (
    <div className='profile'>
      <header className='profile_header'>
        <div class="status_bar">
          <div class="left_item">
            <i class="fa-solid fa-plane"></i>
            <i class="fa-solid fa-wifi"></i>
          </div>
          <div class="center_item">
            <span>15</span>:<span>33</span>
          </div>
          <div class="right_item">
            <i class="fa-regular fa-moon"></i>
            <i class="fa-brands fa-bluetooth-b"></i>
            <span><span>100</span>%</span>
            <i class="fa-solid fa-battery-full"></i>
          </div>
        </div>
        <div class="title_bar">
          <h1 class="blind">profile</h1>
          <div class="left_item"><Link to='/'><i class="fa-solid fa-xmark"></i></Link></div>
          <div class="right_item"><a href="#"><i class="fa-solid fa-user"></i></a></div>
        </div>
      </header>
      <main className='profile_main'>
        <section className="background" style={{backgroundImage: `url(${user.imgs})`}}>
          <h2 className="blind">My Profile background image</h2>
        </section>
        <section className="profile">
          <h2 className="blind">My Profile info</h2>
          <div className="profile_img empty" style={{backgroundImage: `url(${user.imgs})`}}></div>
          <div className="profile_cont">
            <span className="profile_name">{user.name}</span>
            <input type="mail" className="profile_email" placeholder={user.email}/>
            <ul className="profile_menu">
            <li>
              <a href="#">
                <span className="icon">
                  <i className="fa-solid fa-comment"></i>
                </span>
                My Chatroom
              </a>
            </li>
            <li><a href="#"><span className="icon"><i className="fa-solid fa-pencil"></i></span>Edit Profile</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Profile