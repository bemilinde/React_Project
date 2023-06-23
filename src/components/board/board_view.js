import React from "react";
import { db } from "../../firebase.js";

function BoardView({ post, onDelete }) {
  const deletePost = async (postId) => {
    try {
      await db.collection("posts").doc(postId).delete();
      onDelete(postId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {post.date}</p>
      <button onClick={() => deletePost(post.id)}>삭제</button>
    </div>
  );
}

export default BoardView;
