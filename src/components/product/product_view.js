import { useEffect, useState } from "react";
import Layout from "../layout/main_layout";
import { db, auth } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/product_view.css'

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in.");
        return;
      }

      const cartRef = doc(db, "cart", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const updatedCart = [...cartData.products, product];
        await setDoc(cartRef, { products: updatedCart });
      } else {
        await setDoc(cartRef, { products: [product] });
      }

      console.log("Product added to cart:", product);
      navigate('/product/cart')
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <div className="product-view">
          <div className="product_view_image">
            <img src={product.imageURL} alt={product.name} />
          </div>
          <div className="product_view_details">
            <h1 className="product_view_name">{product.name}</h1>
            <p className="product_view_description">{product.description}</p>
            <p className="product_view_price">가격: {product.price}원</p>
            <p className="product_view_author">작성자: {product.authorEmail}</p>
            <p className="product_view_time">작성 시간: {new Date(product.created_at).toLocaleString()}</p>
            <Button variant="outline-secondary" onClick={addToCart}>장바구니에 추가</Button>
          </div>
        </div>
    </Layout>
  );
}

export default ProductView;
