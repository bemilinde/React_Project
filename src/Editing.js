import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

function Notice(){
  return(
    <>
      <div>
        결제 시스템 수정중 입니다.
      </div>

      <Link to={'/'}>
        <Button variant="outline-secondary" style={{marginLeft : "50px", marginTop : "20px"}} >뒤로가기</Button>
      </Link>
    </> 
  )
}

export default Notice