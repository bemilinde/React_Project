import { useEffect, useState } from "react";
import Layout from "../layout/main_layout";
import { db, auth } from "../../firebase";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/product_main.css";

function ProductMain() {
  const [products, setProducts] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);
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

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        console.log("Product deleted successfully!");
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <Layout>
      <div>
        <h2 style={{ marginLeft: "10vw", marginTop: "25px" }}>상품 목록 &gt;&gt;</h2>
        {products.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <Card className="product_main_card" key={product.id}>
                <Card.Img
                  variant="top"
                  src={product.imageURL}
                  alt={product.name}
                  style={{ width: "200px", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title className="product-name">상품명: {product.name}</Card.Title>
                  <Card.Text className="product-description">{product.description}</Card.Text>
                  <Card.Text className="product-price">{product.price} 원</Card.Text>
                  <Card.Text>작성자: {product.authorEmail}</Card.Text>
                  <Link to={`/product/${product.id}/view`}>
                    <Button className="product_btn" variant="outline-secondary">상품상세보기</Button>
                  </Link>
                  {user && product.authorEmail === user.email && (
                    <Button
                      className="product_btn"
                      variant="outline-secondary"
                      onClick={() => handleDelete(product.id)}
                    >
                      삭제
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ProductMain
