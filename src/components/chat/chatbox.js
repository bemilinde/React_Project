import React, { useEffect, useState, useRef } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import Message from "./message.js";
import SendMessage from "./sendmessage.js";
import "../css/chat.css";
import Layout from "../layout/main_layout.js";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <>
      <Layout>
        <main className="chat-box">
          <div className="messages-wrapper">
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <span ref={scroll}></span>
          </div>
          <SendMessage scroll={scroll} />
        </main>
      </Layout>
    </>
  );
};

export default ChatBox;
