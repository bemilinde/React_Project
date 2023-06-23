import React, { useState } from "react";
import { db } from "../../firebase.js";

function BoardCreate({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async () => {
    try {
      const postRef = db.collection("posts").doc();
      const postData = {
        id: postRef.id,
        title,
        content,
        author: user.uid,
        date: new Date().toISOString(),
        views: 0,
      };
      await postRef.set(postData);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="board_page">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      ></textarea>
      <button onClick={createPost}>글쓰기</button>
    </div>
  );
}

export default BoardCreate;
