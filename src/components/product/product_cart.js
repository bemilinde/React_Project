import { useState, useEffect } from "react";
import Layout from "../layout/main_layout";
import { db, auth } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
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
        setCartProducts(cartData.products || []);
      } else {
        console.log("Cart not found.");
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in.");
        return;
      }

      const confirmDelete = window.confirm("정말로 해당 상품을 장바구니에서 삭제하시겠습니까?");
      if (!confirmDelete) {
        return; // Do not proceed with deletion
      }

      const cartRef = doc(db, "cart", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const updatedCart = cartData.products.filter(
          (product) => product.id !== productId
        );

        await updateDoc(cartRef, { products: updatedCart });

        console.log("Product removed from cart:", productId);
        setCartProducts(updatedCart);
      } else {
        console.log("Cart not found.");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>장바구니</h1>
        {cartProducts.length > 0 ? (
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>가격: {product.price}원</p>
                <img src={product.imageURL} alt={product.name} style={{ width: "100px" }} />
                <Button onClick={() => removeFromCart(product.id)}>
                  장바구니에서 제거
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
    </Layout>
  );
}

export default ProductCart;
