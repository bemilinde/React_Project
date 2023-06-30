import React from 'react';
import Layout from './components/layout/main_layout.js';
import Login from './components/authentication/login.js';
import SignUp from './components/authentication/signup.js';
import ChatBox from './components/chat/chatbox.js';
import ImageCarousel from './components/Carousel.js';
import './components/css/main.css'
import { Routes, Route } from 'react-router-dom';
import BoardMain from './components/board/board_main.js';
import BoardCreate from './components/board/board_create.js';
import BoardView from './components/board/board_view.js';
import BoardEdit from './components/board/board_edit.js';
import ProductMain from './components/product/product_main.js';
import ProductCreate from './components/product/product_create.js';
import ProductCart from './components/product/product_cart.js';
import ProductView from './components/product/product_view.js';
function Main() {
  return (

          <Routes>
            <Route path= "/" element = {
              <>
                <Layout>
                  <div>
                    <ImageCarousel/>                  
                  </div>
                </Layout>
              </>
            }/>
            <Route path="/login" element={<Login />} />
            <Route path="/login/signup" element={<SignUp />} />
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/board" element={<BoardMain />} />
            <Route path="/board/create" element={<BoardCreate />} />
            <Route path="/board/view/:id" element={<BoardView />} />
            <Route path="/board/:id/edit" element={<BoardEdit />} />

            <Route path="/product" element={<ProductMain />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/product/cart" element={<ProductCart />} />
            <Route path="/product/:id/view" element={<ProductView />} />


          </Routes>


  );
}

export default Main;
