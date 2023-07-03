import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function TEST(){
  return(
    <>
      <div>
        구현중 입니다..
      </div>
      <Link to={'/'}>
        <Button>뒤로가기</Button>
      </Link>
    </> 
  )
}

export default TEST