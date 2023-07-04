import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from 'react-bootstrap';
import { DateTime } from "luxon";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Layout from "../layout/main_layout";
import './board.css/board_main.css';

function BoardMain() {

  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "articles"), orderBy("created_at", "desc")), (snapshot) => {
      const newList = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setList(newList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <>
        <div className="board_main">

          <div className="board_main_btn">
            <Link to="/board/create">
              <Button variant="outline-secondary">글쓰기</Button>
            </Link>
          </div>

          <div className="board-container">
            <Table responsive="sm" className="board-table">
              <thead>
                <tr className="board_header">
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성시간</th>
                </tr>
              </thead>
              <tbody className="board_content">
                {list.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link to={`/board/view/${item.id}`} className="board-link">{item.subject}</Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{DateTime.fromMillis(item.created_at).toFormat("yyyy-LL-dd HH:mm:ss")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default BoardMain;
