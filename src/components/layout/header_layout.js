import '../css/header.css';
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { CiShop, CiDeliveryTruck, CiShoppingCart, CiViewList, CiChat1, CiFaceSmile, CiUser, CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

function Header() {

  const [user, setUser] = useState(null);


  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
    // Redirect to the home page
    window.location.href = '/';
  };

  const handleCartClick = () => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      // Redirect to the login page
      window.location.href = '/login';
    }
  };

  const handleSellClick = () => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      // Redirect to the login page
      window.location.href = '/login';
    }
  };

  return (
    <>
      <header className='wrap'>
        <div id='container'>
          <Link to={'/'}>
            <div id='logo'>
              <img id='logimg' src={process.env.PUBLIC_URL + '/img/logo.jpg'} />
            </div>
          </Link>
          <div id='title'>
            <Link to={'/'} style={{textDecoration: 'none'}}>
             <span id='title_main'>N E G O</span>
            </Link>
            <span id='title_sub'> 라니?</span>
          </div>
          <div id='menu'>
            <Link to={'/product'}>
              <Button className='menu-btn' variant="outline-secondary">
                <CiShop size="30" /> 쇼핑하기
              </Button>
            </Link>

            <Link to={'/product/create'}>
            <Button className='menu-btn' variant="outline-secondary" onClick={handleSellClick}>
              <CiDeliveryTruck size="30" /> 판매하기
            </Button>
            </Link>

            <Link to={'/product/cart'}>
              <Button className='menu-btn' variant="outline-secondary" onClick={handleCartClick}>
                <CiShoppingCart size="30" /> 장바구니
              </Button>
            </Link>

            <Link to={'/board'}>
              <Button className='menu-btn' variant="outline-secondary">
                <CiViewList size="30" /> 게시판
              </Button>
            </Link>

            {user ? (
              <>
                <Link to={'/chat'}>
                  <Button className='menu-btn' variant="outline-secondary">
                    <CiChat1 size="30" /> 채팅하기
                  </Button>
                </Link>
                
                <Link>
                  <Button className='menu-btn' variant="outline-secondary" onClick={logout}>
                    <CiLogout size="30" /> 로그아웃
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={'/login'}>
                <Button className='menu-btn' variant="outline-secondary">
                  <CiFaceSmile size="30" /> 로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
