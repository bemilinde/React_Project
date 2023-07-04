import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { db, auth } from "../firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import Layout from "../layout/main_layout";
import './board.css/board_view.css';

function BoardView() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(""); 

  useEffect(() => {
    getDoc(doc(db, "articles", id)).then((doc) => {
      const data = doc.data();
      setSubject(data.subject);
      setContent(data.content);
      setAuthor(data.author);
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
