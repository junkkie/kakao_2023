import React, { useEffect, useState } from 'react'
import '../styles/Chatroom.scss';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from 'fbase';
import { ref, deleteObject } from 'firebase/storage';
import 'styles/MyChats.scss'

function MyChats({chat}) {
  const [editing, setEditing] = useState(false);
  const [newTime, setNewTime] = useState(chat.createdAt);
  const [newChat, setNewChat] = useState(chat.text);

  const toggleEditing = () => setEditing((prev) => !prev);

  const onDeleteClick = async () =>{
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, "chats", `/${chat.id}`))
      if(chat.atttachmentUrl !== ""){
        const desertRef = ref(storage, chat.atttachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  const onChange = (e) =>{
    const {target:{value}} = e;
    setNewChat(value);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    const newChatRef = doc(db, "chats", `/${chat.id}`);
    await updateDoc(newChatRef, {
      text: newChat,
      createAt: Date.now(),
    })
    setEditing(false);
  }

  useEffect (() =>{
    let timeStamp = chat.createdAt;
    const now = new Date(timeStamp);
    let hour = now.getHours();
    let minute = now.getMinutes();
    if(hour<10){
      hour = "0" + hour 
    }
    if(minute<10){
      minute = "0" + minute
    }
    setNewTime(hour + ":" + minute);
  },[]);

  return (
    <div className='newChat'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="chatEdit">
            <input className="formInput" type="text" onChange={onChange} value={newChat} required />
            <input className="formBtn" type="submit" value = "Update chat" />
          </form>
          <button className='btns' onClick={onDeleteClick}>삭제</button>
          <button className="btns" onClick={toggleEditing}>취소</button>
        </>
      ):(
      <>
        <>         
          {chat.attachmentUrl && 
          <>
            <img className="img" src={chat.attachmentUrl} alt="" width="50px" height="50px" onClick={toggleEditing} />
            <span class="chat_time">{newTime}</span>
          </>
          }
          {chat.text !== "" && (
            <>
            <span className="chat" onClick={toggleEditing}>{chat.text}</span>
            <span class="chat_time">{newTime}</span>
            </>
          )}
        </>
      </>
      )}
    </div>
  )
}

export default MyChats