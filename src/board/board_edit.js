import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Layout from "../layout/main_layout";
import ArticleForm from "./ArticleForm";

function BoardEdit() {
  
  const [initialValues, setInitialValues] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardDoc = await getDoc(doc(db, 'articles', id));
        if (boardDoc.exists()) {
          setInitialValues(boardDoc.data());
        } else {
          console.log("Board not found");
        }
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };
    fetchBoard();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const boardRef = doc(db, 'articles', id);
      await updateDoc(boardRef, updatedData);
      navigate("/board");
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  return (
    <Layout> 
      {initialValues && (
        <ArticleForm mode="update" initialValues={initialValues} onSubmit={handleUpdate} />
      )}
    </Layout>
  );
}

export default BoardEdit;
