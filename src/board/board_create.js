import Layout from "../layout/main_layout";
import ArticleForm from "./ArticleForm";

function BoardCreate(){
 
  return(
    <Layout>
      <ArticleForm mode={'create'} initialValues={{ subject: '', content: ''}}/>
    </Layout>
  )
}

export default BoardCreate