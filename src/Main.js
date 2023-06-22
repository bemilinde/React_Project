import React from 'react';
import Layout from './components/layout/main_layout.js';
import Login from './components/authentication/login.js';
import SignUp from './components/authentication/signup.js';
import ChatBox from './components/chat/chatbox.js';
import ImageCarousel from './components/Carousel.js';
import './components/css/main.css'
import { Routes, Route, Outlet } from 'react-router-dom';

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
          </Routes>


  );
}

export default Main;
