import React from "react";
import { auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import '../css/message.css';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const renderUserAvatar = () => {
    if (message.avatar) {
      return (
        <img
          className="chat-bubble__left"
          src={message.avatar}
          alt="user avatar"
        />
      );
    } else {
      return (
        <img
          className="chat-bubble__left"
          id="logimg"
          src={process.env.PUBLIC_URL + '/img/logo.jpg'}
          alt="default avatar"
        />
      );
    }
  };

  const renderUserName = () => {
    if (message.name) {
      return <p className="user-name">{message.name}</p>;
    } else {
      return <p className="user-name">NEGO 익명</p>;
    }
  };

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      {renderUserAvatar()}
      <div className="chat-bubble__right">
        {renderUserName()}
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
