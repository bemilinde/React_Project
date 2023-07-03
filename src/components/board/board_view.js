import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, doc, deleteDoc, getDoc, addDoc, serverTimestamp, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import Layout from "../layout/main_layout";
import { db, auth } from "../../firebase"; // Firebase auth 추가
import '../css/board_view.css'
import { Button } from "react-bootstrap";

function BoardView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(""); // 작성자 상태 추가

  useEffect(() => {
    getDoc(doc(db, "articles", id)).then((doc) => {
      const data = doc.data();
      setSubject(data.subject);
      setContent(data.content);
      setAuthor(data.author); // 작성자 정보 설정
    });
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  const Delete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "articles", id));
        navigate("/board");
      } catch (error) {
        console.error("게시물 삭제 중 오류가 발생했습니다.", error);
      }
    }
  };

  return (
    <Layout>

      <div className="board_view">
        <div className="view_title">
          제목 : {subject}
        </div>
        <div className="view_user">
          {author}
        </div>
        <div className="view_content">
          {content}
        </div>
        <div className="view_btn_wrap">
          {user && user.email === author && (
          <>
            <Button className="view_btn" variant="outline-secondary" onClick={Delete}>삭제</Button>
              <Link to={`/board/${id}/edit`}>
            <Button className="view_btn" variant="outline-secondary" >수정</Button>
            </Link>
          </>
          )}
          <Link to={'/board'}>
           <Button className="view_btn" variant="outline-secondary" >뒤로가기</Button>
          </Link>
        </div>
      </div>

    </Layout>
  );
}

export default BoardView;
