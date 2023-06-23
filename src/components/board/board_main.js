import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../css/board.css'

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const addPost = async () => {
    if (title.trim() === '' || content.trim() === '') {
      return;
    }

    await addDoc(collection(db, 'posts'), {
      title,
      content,
    });

    setTitle('');
    setContent('');
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
  };

  const updatePost = async (postId, updatedTitle, updatedContent) => {
    await updateDoc(doc(db, 'posts', postId), {
      title: updatedTitle,
      content: updatedContent,
    });
  };

  return (
    <div>
      <h1>게시판</h1>

      {/* 게시글 작성 폼 */}
      <form onSubmit={addPost}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
        <button type="submit">게시글 작성</button>
      </form>

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>삭제</button>
          <button onClick={() => updatePost(post.id, '새로운 제목', '새로운 내용')}>수정</button>
        </div>
      ))}
    </div>
  );
};

export default Board;
