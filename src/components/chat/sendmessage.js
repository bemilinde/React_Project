import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import '../css/sendmessage.css'

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={sendMessage} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="채팅을 통해 NEGO 하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">입력하기</button>
    </form>
  );
};

export default SendMessage;
