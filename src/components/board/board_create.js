import Layout from "../layout/main_layout"
import './board_create.css'
import { db, auth } from "../../firebase"
import { collection, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

function BoardCreate(){

  const [subject, setSubject] = useState();
  const [content, setContent] = useState();
  const  navigator = useNavigate();
  const [user, setUser] = useState();
  
  const submit = async () =>{
    
    addDoc( collection( db, 'articles' ), {
      subject,
      content,
      author : user.email,
      create_at : new Date().getTime(),

    })
    alert( '게시글 작성 완료.' );
    setSubject( ' ' );
    setContent( ' ' );
    navigator('/board')
  }

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      setUser( user )
    })
  })

  return(
    <Layout>
      <h1>글쓰기</h1>

      <form className="board_wrap" onSubmit={(event)=> {
        event.preventDefault();
        return false;
      }}>

        <div>
          <input 
          className="board_title"  
          placeholder="제목을 입력하세요."
          value={ subject }
          onChange={ event => setSubject(event.target.value)}
          />
        </div>

        <div>
          <textarea 
          className="board_text" 
          placeholder="내용을 입력하세요."
          value={ content }
          onChange={ event => setContent(event.target.value)}
          ></textarea>
        </div>

        <div>
          <button onClick={submit}>전송</button>
        </div>

      </form>
    </Layout>
  )
}

export default BoardCreate