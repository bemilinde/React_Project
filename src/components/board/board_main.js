import { Link } from "react-router-dom";
import Layout from "../layout/main_layout";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';

function BoardMain(){

  const [ list, setList ] = useState([]);

  useEffect(()=>{
    getDocs(query( collection( db, 'articles' ), orderBy('created_at', 'desc') ) )
      .then( result => {
        const newList = [];
          result.forEach( doc =>{
            const data = doc.data();
            data.id = doc.id;
            newList.push( data );
        })
        setList( newList );
      })
  }, [])
  
  return(
    <>
      <Layout>
        <Link to="/board/create">
          <button>글쓰기</button>
        </Link>

        <Table responsive="sm">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map( item => (
                <tr key={ item.id }>
                  <td>#</td>
                  <td>{item.subject}</td>
                  <td>{item.author}</td>
                </tr>
              ))
            }
          </tbody>
      </Table>

      </Layout>
    </>
  )
}

export default BoardMain