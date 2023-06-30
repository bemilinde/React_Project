import { db, auth } from "../../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function ArticleForm({ initialValues, mode }) {
  const { id } = useParams();
  const [subject, setSubject] = useState(initialValues.subject || "");
  const [content, setContent] = useState(initialValues.content || "");
  const navigator = useNavigate();
  const [user, setUser] = useState(null);

  const submit = async () => {
    try {
      await addDoc(collection(db, "articles"), {
        subject,
        content,
        author: user.email,
        created_at: new Date().getTime(),
      });
      alert("게시글 작성 완료.");
      setSubject("");
      setContent("");
      navigator("/board");
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  const update = async () => {
    try {
      await updateDoc(doc(db, "articles", id), {
        subject,
        content,
      });
      alert("게시글 수정 완료.");
      setSubject("");
      setContent("");
      navigator("/board");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <form
        className="board_wrap"
        onSubmit={(event) => {
          event.preventDefault();
          return false;
        }}
      >
        <div>
          <input
            className="board_title"
            placeholder="제목을 입력하세요."
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div>
          <textarea
            className="board_text"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>

        <div>
          <button onClick={mode === "update" ? update : submit}>
            {mode === "update" ? "수정" : "전송"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArticleForm;
