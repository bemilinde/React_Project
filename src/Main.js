import React, { useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { db } from './firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';

import Layout from './layout/main_layout.js';
import ImageCarousel from './layout/Carousel.js';
import Login from './authentication/login.js';
import SignUp from './authentication/signup';
import ChatBox from './chat/chatbox.js';
import BoardMain from './board/board_main.js';
import BoardCreate from './board/board_create.js';
import BoardView from './board/board_view.js';
import BoardEdit from './board/board_edit.js';
import ProductMain from './product/product_main.js';
import ProductCreate from './product/product_create.js';
import ProductCart from './product/product_cart.js';
import ProductView from './product/product_view.js';
import Notice from './Editing.js';
import './layout/layout.css/main.css';


function Main() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, "products"), orderBy("created_at", "desc"), limit(10));
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Layout>
            <div>
              <ImageCarousel />
            </div>
            <div>
              <Link to={'/product'} className='link'>
               <h2 style={{ marginLeft : "10vw"}}>최근 상품  &gt;&gt;</h2>
              </Link>
              <div className="row">
                {products.length === 0 ? (
                  <p>상품이 없습니다.</p>
                ) : (
                  products.map((product) => (
                    <Card className='Product_Card' key={product.id}>
                      <Card.Img
                        variant="top"
                        src={product.imageURL}
                        alt={product.name}
                        style={{ width: "200px", height: "200px", marginLeft : "10px", marginTop : "15px"}}
                      />
                      <Card.Body>
                        <Card.Title className='product-name'>상품명: {product.name}</Card.Title>
                        <Card.Text className='product-description'>{product.description}</Card.Text>
                        <Card.Text className='product-price'>{product.price} 원</Card.Text>

                        <Link to={`/product/${product.id}/view`}>
                          <Button variant="outline-secondary">상품상세보기</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </Layout>
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/login/signup" element={<SignUp />} />

      <Route path="/chat" element={<ChatBox />} />
      <Route path="/board" element={<BoardMain />} />
      <Route path="/board/create" element={<BoardCreate />} />
      <Route path="/board/view/:id" element={<BoardView />} />
      <Route path="/board/:id/edit" element={<BoardEdit />} />

      <Route path="/product" element={<ProductMain />} />
      <Route path="/product/create" element={<ProductCreate refreshProducts={fetchProducts} />} />
      <Route path="/product/cart" element={<ProductCart />} />
      <Route path="/product/:id/view" element={<ProductView />} />

      <Route path="/editing" element={<Notice />} />


    </Routes>
  );
}

export default Main;



