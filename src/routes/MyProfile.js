import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/MyProfile.scss'
import { auth, db, storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadString, deleteObject } from 'firebase/storage';
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

function MyProfile({me, userObj}) {
  const navigate = useNavigate();
  const [newName, setNewName] = useState(userObj.displayName); //프로필 이름
  const [newProfile, setNewProfile] = useState(""); //프로필 이미지
  const [newMsg, setNewMsg] = useState(""); //프로필 상태메시지
  const [backImg, setBackImg] = useState("");
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState("");

   // 로그아웃
   const onLogOutClick = () =>{
    auth.signOut();
    navigate('/');
  }

  //프로필 이름 수정
  const onChangeName = (e) =>{
    const {target:{value}} = e;
    setNewName(value);
  }

  
   //프로필 상태메시지 수정
   const onChangeMsg = (e) => {
    const {target:{value}} = e;
    setNewMsg(value);
  }

  //프로필 submit
  const onSubInfo = async () => {
    try {
      //이름
      if(userObj.displayName !== newName){
        await updateProfile(userObj, {displayName: newName});
      }
      //상태메시지
      const newProfileRef = await setDoc(doc(db, `${userObj.uid}`, "profileMsg"), {
        message: newMsg,
      })
      await updateDoc(newProfileRef, {
        message: newMsg,
      })
    } catch (error) {
      console.log("error: ", error);
    }
    setEditing(false);
    console.log("userObj =>", userObj)
  }

  // 프로필 이미지 업로드
  const onProfileChange = (e) =>{
    const {target: {files}} = e;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setNewProfile(result);
    }
    reader.readAsDataURL(theFile);
  }
  
  //프로필 이미지 submit
  const onSubImg = async (e) => {
    e.preventDefault();
    try {
      let profileUrl = "";
      if(newProfile !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, newProfile, 'data_url');
        profileUrl = await getDownloadURL(ref(storage, response.ref));
      }
      await updateProfile(userObj, {photoURL: profileUrl});
    } catch (error) {
      console.log("error: ", error);
    }
    setEditing(false);
    console.log("userObj.photoURL =>", userObj)
  }

  //프로필 이미지 delete
  const onDelProfile = async () => {
    const alw = window.confirm("프로필 사진을 삭제하시겠어요?");
    if(alw){
      if(userObj.photoURL !== ""){
        const desertRef = ref(storage, userObj.photoURL);
        await deleteObject(desertRef);
      }
    }
  }

  //프로필 배경이미지 업로드
  const onBackImgChange = (e) => {
    const {target: {files}} = e;
    const theFile = files[0];
    console.log("theFile->", theFile); 

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setBackImg(result);
    }
    reader.readAsDataURL(theFile);
  }

  //프로필 배경이미지 submit
  const onBackImg = async (e) => {
    e.preventDefault();
    try {
      let BackImgUrl = "";
      if(backImg !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, backImg, 'data_url');
        BackImgUrl = await getDownloadURL(ref(storage, response.ref));
      }
      const newProfileRef = await setDoc(doc(db, `${userObj.uid}`, "profileBackground"), {
        backImgUrl: BackImgUrl
      })
      await updateDoc(newProfileRef, {
        backImgUrl: BackImgUrl
      })
    } catch (error) {
      console.log("error: ", error);
    }
    setEditing(false);
  }

  // 프로필 edit onClick
  const onEditProfile = async(e) =>{
    e.preventDefault();
    setEditing(true);
  }

  // 프로필 edit 클릭 시 이미지 파일 선택 버튼 노출
  const onCancelEdit = () => setEditing(false);

  useEffect(() => {
    // 상단바 시간
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    setTime(hour + ":" + minute);
    
    // 프로필
    const q = query(collection(db, `${userObj.uid}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      console.log("newArray =>", newArray);
      if (newArray[1] !== undefined) {
        setNewMsg(newArray[1].message);
      }
      if (newArray[0] !== undefined) {
        setBackImg(newArray[0].backImgUrl);
      }
    });

  }, []);


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
          <h1 class="blind">profile</h1>
          <div class="left_item"><Link to='/'><i class="fa-solid fa-xmark"></i></Link></div>
          <div class="right_item"><a href="#"><i class="fa-solid fa-user"></i></a></div>
        </div>
      </header>
      <main className='profile_main'>
      {me.map((me) => (
        <>
          <section className="background" style={{backgroundImage: `url(${backImg})`}}>
            <h2 className="blind">My Profile background image</h2>
            {editing && 
              <form className='backImgForm' onSubmit={onBackImg}>
                <label htmlFor='backImg'>
                  <input type='file' id='backImg' className='inputBackFile' onChange={onBackImgChange} />
                  <i class="fa-solid fa-folder-closed"></i>
                </label>
                <label htmlFor='subBackground'>
                  <input type='submit' id='subBackground' className='inputBackSub' />
                  <i class="fa-regular fa-square-check"></i>
                </label>
              </form>
            }
          </section>
          <section className="profile">
            <h2 className="blind">My Profile info</h2>
                {newProfile && <div className="profile_img empty" style={{backgroundImage: `url(${newProfile})`}}></div>}
                <div className="profile_img empty" style={{backgroundImage: `url(${userObj.photoURL})`}}></div>
            <div className="profile_cont">
              {editing &&
                <form className='profileForm' onSubmit={onSubImg}>
                  <label htmlFor='profileFile'>
                    <input className='profile' type='file' id='profileFile' onChange={onProfileChange} />
                  </label>
                  <span>▲ Click! ▲</span>
                  <label htmlFor='imgsub' className='imgupdate'>
                      <input id='imgsub' className='submit imgSub' type='submit' value="" />
                      <i class="fa-regular fa-square-check"></i>
                  </label>

                  <button className='deleteImg' onClick={onDelProfile}><i class="fa-solid fa-trash"></i></button>
                </form>
              }
              <form className='infoForm' onSubmit={onSubInfo}>
                <input className='nameInput' type='text' value={newName} placeholder='이름' onChange={onChangeName} />
                <input className='msgInput' type="text" value={newMsg} placeholder='상태메시지' onChange={onChangeMsg} />
                {editing &&
                  <>
                    <label htmlFor='infosub' className='infoupdate'>
                      <input className='submit infoSub' id='infosub' type='submit' value="업데이트" />
                      <i class="fa-regular fa-circle-check"></i>
                    </label>
                    <button className='cancel' onClick={onCancelEdit}><i class="fa-regular fa-circle-xmark"></i></button>
                  </>
                }
              </form>
              <ul className="profile_menu">
              <li>
                <span className="icon" onClick={onLogOutClick}><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
                로그아웃
              </li>
              <li onClick={onEditProfile}>
                <span className="icon"><i className="fa-solid fa-pencil"></i></span>
                프로필 수정
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