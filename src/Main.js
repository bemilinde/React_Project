import React from 'react';
import Layout from './components/layout/main_layout.js';
import Login from './components/authentication/login.js';
import SignUp from './components/authentication/signup.js';
import ChatBox from './components/chat/chatbox.js';
import ImageCarousel from './components/Carousel.js';
import './components/css/main.css'
import { Routes, Route } from 'react-router-dom';
import Board from './components/board/board_main.js';

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
            <Route path="/login" element={ <Login/> }/> 
            <Route path="/login/signup" element={ <SignUp/> }/>
            <Route path="/chat" element={ <ChatBox/> }/>
            <Route path="/board" element={ <Board/> }/>
          </Routes>


  );
}

export default Main;
