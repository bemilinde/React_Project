import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js"
import "../css/board.css";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import BoardCreate from "./board_create.js";

function BoardMain({ user }) {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = db.collection("posts");
        const snapshot = await postsRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    try {
      await db.collection("posts").doc(postId).delete();
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="board_table">
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            {user && <th>삭제</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">로딩 중...</td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to={`/board/view/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                {user && user.uid === post.author && (
                  <td>
                    <button onClick={() => deletePost(post.id)}>삭제</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {user && (
        <div>
          <Route path="/board/create" element={<BoardCreate user={user} />} />
        </div>
      )}
    </div>
  );
}

export default BoardMain;
