import Layout from "../layout/main_layout"
import './board_create.css'
import ArticleForm from "./ArticleForm"

function BoardCreate(){
 
  return(
    <Layout>
      <h1>글쓰기</h1>

      <ArticleForm mode={'create'} initialValues={{ subject: '', content: ''}}/>
    </Layout>
  )
}

export default BoardCreate