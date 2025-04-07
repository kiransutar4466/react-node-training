import { useNavigate } from "react-router"
import Button from "../../components/Button"


const Custom404Page = () => {

  const navigate = useNavigate()
  return (
    <div className="flex flex-col text-center m-5 justify-center items-center gap-5 mt-12">
      
      <div className="font-medium">404 Page Not Found! or you may not be authorize to see this page</div>
      <Button  btnContent="Navigate to home page" width="fit" color="primary-white" bgColor="primary-orange" onClickCb={()=>navigate('/')}/>
      
    </div>
  )
}

export default Custom404Page