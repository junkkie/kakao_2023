import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import 'styles/Chatroom.scss';
import { db, storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import MyChats from 'components/MyChats';


function Chatroom({userObj, me}) {
  const location = useLocation();
  const user = location.state;

  const [chat, setChat] = useState('');
  const [attachment, setAttachment] = useState("");
  const [allChats, setAllChats] = useState([]);

  useEffect(() =>{
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id})
    });
    setAllChats(newArray.reverse());
    })
  },[],);


  const onChange = (e) =>{
    e.preventDefault();
    const {target: {value}} =e;
    setChat(value);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    try{
      // 이미지
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url');
        console.log("response >", response);
        attachmentUrl = await getDownloadURL(ref(storage, response.ref));
        console.log("attachmentUrl >",attachmentUrl);
      }
      
      // 채팅
      const docRef = await addDoc(collection(db, "chats"), {
        text: chat,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch(e) {
      console.error("Error adding document: ", e);
    }
    setChat("");
    setAttachment("");
  }

  const onFileChange = (e) =>{
    const {target: {files}} = e;
    const theFile = files[0];
    console.log("theFile->", theFile); 

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) =>{
      const {currentTarget:{result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }


  const deleteAttachment = () =>{
    setAttachment("");
  }

  return (
    <div className='bg'>
      <header className='Chatroom_header'>
        <div className="status_bar">
          <div className="left_item">
            <i class="fa-solid fa-plane"></i>
            <i class="fa-solid fa-wifi"></i>
          </div>
          <div className="center_item">
            <span>15</span>:<span>33</span>
          </div>
          <div className="right_item">
            <i class="fa-regular fa-moon"></i>
            <i class="fa-brands fa-bluetooth-b"></i>
            <span><span>100</span>%</span>
            <i class="fa-solid fa-battery-full"></i>
          </div>
        </div>

        <div className="title_bar">
          <h1>Friend Name</h1>
          <div className="left_item"><Link to='/chats'><i class="fa-solid fa-chevron-left"></i></Link></div>
          <div className="right_item"><i class="fa-solid fa-magnifying-glass"></i><i class="fa-solid fa-bars"></i></div>
        </div>
      </header>
      <main className='chatroom_main'>
        <span className="date_info">Tursday, March 23, 2023</span>
        {me.map((me) =>(
          <div className="chat_box my">
            <span className="chat">{me.chat1}</span>
            <span className="chat">{me.chat2}</span>
            <span className="chat">{me.chat3}</span>
            <span className="chat_time"><span>15</span>:<span>20</span></span>
          </div>
        ))}
        <div className="chat_box other">
          <div className="other_info">
            <span className="profile_img empty" style={{backgroundImage: `url(${user.imgs})`}}></span>
            <span className="profile_name">{user.name}</span>
          </div>
          <span className="chat">{user.chats[0]}</span>
          <span className="chat">{user.chats[1]}</span>
          <span className="chat">{user.chats[2]}</span>
          <span className="chat_time"><span>15</span>:<span>35</span></span>
        </div>
          {allChats.map((chat) =>(
            <MyChats key={chat.id} chat={chat} isOwner={chat.creatorId === userObj.uid} />
          ))}
      </main>
      <footer className='chatroom_footer'>
        <span className="plus_btn"><i class="fa-solid fa-plus"></i></span>
        <form action="/" method="post" className='chatroom_txtbox' onSubmit={onSubmit}>
          <fieldset className="text_box">
            <label htmlFor='attachFile'>
              <input type='file' id='attachFile' accept='image/*' onChange={onFileChange} />
              {attachment && (
                <div className='prevImg'>
                  <img src={attachment} alt='' style={{backgroundImage:attachment}} />
                  <div className='delete_photo' onClick={deleteAttachment}>
                    <span>사진 전송 취소</span>
                  </div>
                </div>
              )}
            </label>
            <label htmlFor="chatting" class="blind">채팅 입력</label>
            <input type="text" id="chatting" className="text_field" value={chat} placeholder='입력 후 엔터' onChange={onChange} />
            <input type='submit' className='chat_arrow' value='&rarr;' />
            <span className="emoticon_btn"><i class="fa-regular fa-face-smile"></i></span>
            <span className="voice_btn"><i class="fa-solid fa-angle-right"></i></span>
          </fieldset>
        </form>
      </footer>
    </div>
  )
}

export default Chatroom