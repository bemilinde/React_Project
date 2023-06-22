import '../css/header.css';
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { CiShop, CiDeliveryTruck, CiShoppingCart, CiViewList, CiChat1, CiFaceSmile, CiUser, CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

function Header() {
  let navigator = useNavigate();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };


  return (
    <>
      <header className='wrap'>
        <div id='container'>
          <div id='logo' onClick={() => { navigator('/'); }}>
            <img id='logimg' src={process.env.PUBLIC_URL + '/img/logo.jpg'} />
          </div>
          <div id='title'>
            <span id='title_main' onClick={() => { navigator('/'); }}>N E G O</span>
            <span id='title_sub'> 라니?</span>
          </div>
          <div id='menu'>
            <Button className='menu-btn' variant="outline-secondary">
              <CiShop size="30" /> 쇼핑하기
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiDeliveryTruck size="30" /> 판매하기
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiShoppingCart size="30" /> 장바구니
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiViewList size="30" /> 게시판
            </Button>

            {user ? (
              <>
                <Button className='menu-btn' variant="outline-secondary" onClick={()=> {navigator('/chat')}}>
                  <CiChat1 size="30" /> 채팅하기
                </Button>
              
                <Button className='menu-btn' variant="outline-secondary">
                  <CiUser size="30" /> 마이페이지
                </Button>
                <Button className='menu-btn' variant="outline-secondary" onClick={logout}>
                  <CiLogout size="30" /> 로그아웃
                </Button>
              </>
            ) : (
              <Button className='menu-btn' variant="outline-secondary" onClick={() => { navigator('/login'); }}>
                <CiFaceSmile size="30" /> 로그인
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
