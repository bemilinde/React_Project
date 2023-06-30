import { useEffect, useState } from "react";
import Layout from "../layout/main_layout";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function ProductMain() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div>
        <h1>상품 목록</h1>
        <div className="row">
          {products.map((product) => (
            <Card key={product.id} style={{ width: '15rem' }}>
              <Card.Img variant="top" src={product.imageURL} alt={product.name} style={{ width: "200px", height: "200px" }} />
              <Card.Body>
                <Card.Title>상품명:{product.name}</Card.Title>
                <Card.Text>상품내용:{product.description}</Card.Text>
                <Card.Text>가격: {product.price}원</Card.Text>
                <Card.Text>작성자: {product.authorEmail}</Card.Text>
                <Card.Text>작성 시간: {new Date(product.created_at).toLocaleString()}</Card.Text>
                <Link to={`/product/${product.id}/view`}>
                  <Button variant="primary">상품상세보기</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductMain;
