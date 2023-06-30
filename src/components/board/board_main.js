import { Link } from "react-router-dom";
import Layout from "../layout/main_layout";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";


import { Table } from 'react-bootstrap';


function BoardMain(){

  const [ list, setList ] = useState([]);

  useEffect(()=>{
    onSnapshot(query( collection( db, 'articles' ), orderBy( 'created_at', 'desc') ), result =>{
      const newList = [];
          result.forEach( doc =>{
            const data = doc.data();
            data.id = doc.id;
            newList.push( data );
        })
        setList( newList );
    })
    // getDocs(query( collection( db, 'articles' ), orderBy( 'created_at', 'desc') ) )
    //   .then( result => {
    //     const newList = [];
    //       result.forEach( doc =>{
    //         const data = doc.data();
    //         data.id = doc.id;
    //         newList.push( data );
    //     })
    //     setList( newList );
    //   })
  }, [])
  
  return(
    <>
      <Layout>

        <Table responsive="sm">
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성시간</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map( item => (
                <tr key={ item.id }>
                <td>
                  <Link to={`/board/view/${item.id}`}>{item.subject}</Link>
                </td>
                  <td>{item.author}</td>
                  <td>{DateTime.fromMillis( item.created_at ).toFormat( 'yyyy-LL-dd HH:mm:ss' )}</td>
                </tr>
              ))
            }
          </tbody>
      </Table>

      <Link to="/board/create">
       <button>글쓰기</button>
      </Link>

      </Layout>
    </>
  )
}

export default BoardMain