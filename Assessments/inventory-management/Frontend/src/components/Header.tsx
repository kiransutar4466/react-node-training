import { BsLayoutSidebarInset } from "react-icons/bs";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/navSlice";
import { rootState } from "../store/store";
import { useNavigate } from "react-router";



const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoggedIn ,userDetails} = useSelector((state:rootState)=>state.auth)
  return (
    <>
      <div className="fixed top-0 bg-sidebar-bg h-[10vh] p-4 text-text-dark flex w-full justify-between items-center z-50 border-[1px] border-table-border">
        <div className="flex justify-between items-center gap-3">
          {isLoggedIn  && <Button
            btnContent={<BsLayoutSidebarInset />}
            color="dark-orange"
            width="fit"
            onClickCb={() => {dispatch(toggleSidebar())}}
            classNames="text-2xl"
          />}
          <span onClick={()=>navigate('/')} className="text-text-dark font-bold text-center text-[20px] mx-2 cursor-pointer">
            Smart Inventory
          </span>
        </div>
        <div className="flex text-center justify-between items-center gap-3">
       {userDetails?.firstName && userDetails?.lastName  &&  <><span>{userDetails.firstName+" "+userDetails.lastName}</span>
        <span className="bg-dark-orange text-primary-white border-text-dark  rounded-full h-10 w-10 text-center flex justify-center items-center font-medium border-[1px]">{userDetails.firstName[0]+userDetails.lastName[0].toLocaleUpperCase()}</span></>}  
        </div>
      </div>
    </>
  );
};

export default Header;
