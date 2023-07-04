import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { db, auth } from "../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Layout from "../layout/main_layout";
import './product.css/product_cart.css';

function ProductCart() {

  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [cartProducts]);

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

      const confirmDelete = window.confirm("장바구니에서 삭제하시겠습니까?");
      if (!confirmDelete) {
        return; 
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

  const calculateTotalAmount = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price;
    });
    setTotalAmount(total);
  };

  return (
    <Layout>
      <div className="cart-container">
        {cartProducts.length > 0 ? (
          <>
          <table className="cart-items">
            <thead>
              <tr>
                <th>상품 이미지</th>
                <th>상품명</th>
                <th>상품설명</th>
                <th>가격</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.id} className="cart-item">
                  <td className="cart-item-image">
                    <img src={product.imageURL} alt={product.name} />
                  </td>
                  <td className="cart-item-info">
                    <h3 className="cart-item-title">{product.name}</h3>                    
                  </td>
                  <td>
                  <p className="cart-item-description">{product.description}</p>
                  </td>
                  <td className="cart-item-price">{product.price}원</td>
                  <td className="cart-item-action">
                    <Button variant="outline-secondary" onClick={() => removeFromCart(product.id)}>
                      제거
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart_total_main">
            <div className="cart-total" >
              총액: {totalAmount}원    
            </div>
            <Link to={'/editing'}>
              <Button variant="outline-secondary">
                구매하기
              </Button>
            </Link>
          </div>
          </>
                
        ) : (
          <p className="cart-empty-message">장바구니가 비어 있습니다.</p>
        )}
      </div>
    </Layout>
  );
}

export default ProductCart;


