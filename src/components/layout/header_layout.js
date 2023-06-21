import '../css/header.css'
import { Button } from 'react-bootstrap'
import { CiShop, CiDeliveryTruck, CiShoppingCart, CiViewList, CiChat1, CiFaceSmile } from "react-icons/ci";

function Header(){
  return(
    <>
      <header className='wrap'>
        <div id='container'>
          <div id='logo'>
            <img id = 'logimg' src={process.env.PUBLIC_URL +'/img/logo.jpg'}/>
          </div>
          <div id='title'>
            <span id='title_main'>N E G O</span>
            <span id='title_sub'> 라니?</span>
          </div>
          <div id='menu'>            
            <Button className='menu-btn' variant="outline-secondary">
              <CiShop size="30"/> 쇼핑하기
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiDeliveryTruck size="30"/> 판매하기
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiShoppingCart size="30"/> 장바구니
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiViewList size="30"/> 게시판
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiChat1 size="30"/> 채팅하기
            </Button>

            <Button className='menu-btn' variant="outline-secondary">
              <CiFaceSmile size="30"/> 로그인
            </Button>            
          </div>
        </div>
      </header>
      
    </>
  )
}

export default Header;