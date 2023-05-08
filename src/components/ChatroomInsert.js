import { db, storage } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'styles/ChatroomInsert.scss'

function ChatroomInsert({userObj}) {
  const [chat, setChat] = useState('');
  const [attachment, setAttachment] = useState("");

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
        attachmentUrl = await getDownloadURL(ref(storage, response.ref));
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
    <>
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
            <label for="chatting" class="blind">채팅 입력</label>
            <input type="text" id="chatting" className="text_field" value={chat} placeholder='입력 후 엔터' onChange={onChange} />
            <input type='submit' className='chat_arrow' value='&rarr;' />
            <span className="emoticon_btn"><i class="fa-regular fa-face-smile"></i></span>
            <span className="voice_btn"><i class="fa-solid fa-angle-right"></i></span>
          </fieldset>
        </form>
      </footer>
    </>
  )
}

export default ChatroomInsert