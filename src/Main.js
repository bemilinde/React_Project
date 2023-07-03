// Main.js

import React, { useEffect, useState } from 'react';
import Layout from './components/layout/main_layout.js';
import Login from './components/authentication/login.js';
import SignUp from './components/authentication/signup.js';
import ChatBox from './components/chat/chatbox.js';
import ImageCarousel from './components/Carousel.js';
import './components/css/main.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import BoardMain from './components/board/board_main.js';
import BoardCreate from './components/board/board_create.js';
import BoardView from './components/board/board_view.js';
import BoardEdit from './components/board/board_edit.js';
import ProductMain from './components/product/product_main.js';
import ProductCreate from './components/product/product_create.js';
import ProductCart from './components/product/product_cart.js';
import ProductView from './components/product/product_view.js';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from './firebase';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import TEST from './TEST.js';

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
                        style={{ width: "200px", height: "200px" }}
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

      <Route path="/test" element={<TEST />} />


    </Routes>
  );
}

export default Main;



