import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/Profile.scss'
import { auth, db, storage } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

function MyProfile({me, userObj}) {
  const [newName, setNewName] = useState(userObj.displayName);
  const [myProfile, setMyProfile] = useState([]);
  const [newProfile, setNewProfile] = useState(""); //프로필 이미지
  const [editing, setEditing] = useState(false);

  const onChangeName = (e) =>{
    const {target:{value}} = e;
    setNewName(value);
  }

  //프로필 수정 onSubmit
  const onSubmit = async(e) =>{
    e.preventDefault();
    try {
      //이미지
      let profileUrl = "";
      if(newProfile !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, newProfile, 'data_url');
        console.log("response >", response);
        profileUrl = await getDownloadURL(ref(storage, response.ref));
        console.log("attachmentUrl >",profileUrl);
      }
      const newProfileRef = doc(db, "profiles", `/${userObj.id}`);
      const docRef = await addDoc(collection(db, "profiles"), {
        displayName: newName,
        profileUrl
      });

      if(userObj.displayName !== newName){
        await updateProfile(userObj,{
          displayName: newName,
          profileUrl
        })
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setEditing(false);
    setNewProfile("");
  }


  useEffect(() => {
    const q = query(collection(db, "profiles"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedProfile = [];
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          updatedProfile.push({ ...change.doc.data(), id: change.doc.id });
        }
      });
      setMyProfile((prevProfile) => [
        ...prevProfile.filter((profile) => {
          return !updatedProfile.find((update) => update.id === profile.id);
        }),
        ...updatedProfile,
      ]);
    });
    return unsubscribe;
  }, []);

 // 로그아웃
  const onLogOutClick = () =>{
    auth.signOut();
    Navigate('/');
  }

  // 프로필 이미지 업로드
  const onFileChange = (e) =>{
    const {target: {files}} = e;
    const theFile = files[0];
    console.log("theFile->", theFile); 

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setNewProfile(result);
    }
    reader.readAsDataURL(theFile);
  }

  // 프로필 edit onClick
  const onEditProfile = async(e) =>{
    e.preventDefault();
    setEditing(true);
  }

  // 프로필 edit 누르면 이미지 파일 선택 버튼 노출
  const onCancelEdit = () => setEditing(false);

  // 프로필 이미지 삭제
  const delProfileImg = () => setNewProfile("");


  return (
    <>
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
      {me.map((me) => (
        <>
          <section className="background" style={{backgroundImage: `url(${me.imgs})`}}>
            <h2 className="blind">My Profile background image</h2>
          </section>
          <section className="profile">
            <h2 className="blind">My Profile info</h2>
            {newProfile && <div className="profile_img empty" style={{backgroundImage: `url(${newProfile})`}}></div>}
            <div className="profile_img empty" style={{backgroundImage: `url(${userObj.profileUrl})`}}></div>
            {editing && <button onClick={delProfileImg}>이미지 삭제</button>}
            <div className="profile_cont">
              <form className='profileForm' onSubmit={onSubmit}>
                {editing &&
                  <label htmlFor='attachFile'>
                    <input type='file' id='attachFile' className='profile_img' onChange={onFileChange} />
                  </label>
                }
                <input type='text' className="profile_name" value={newName} placeholder='이름' onChange={onChangeName} />
                <input type="text" className="profile_email" value={me.msg} />
                {editing &&
                  <>
                  <input type='submit' value="업데이트" />
                  <button onClick={onCancelEdit}>취소</button>
                  </>
                  }
              </form>

              <ul className="profile_menu">
              <li>
                <span className="icon" onClick={onLogOutClick}><i className="fa-solid fa-comment"></i></span>
                LogOut
              </li>
              <li onClick={onEditProfile}>
                <span className="icon"><i className="fa-solid fa-pencil"></i></span>
                Edit Profile
              </li>
              </ul>
            </div>
          </section>
        </>
      ))}
      </main>
    </div>
    </>
  )
}

export default MyProfile