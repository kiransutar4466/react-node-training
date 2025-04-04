import { BsLayoutSidebarInset } from "react-icons/bs";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../store/navSlice";
import { rootState } from "../store/store";



const Header = () => {

  const dispatch = useDispatch()

  const {isLoggedIn ,userDetails} = useSelector((state:rootState)=>state.auth)
  return (
    <>
      <div className="fixed top-0 bg-secondary-black h-[10vh] p-4 text-primary-white flex w-full justify-between items-center z-50">
        <div className="flex justify-between items-center gap-3">
          {isLoggedIn  && <Button
            btnContent={<BsLayoutSidebarInset />}
            color="primary-white"
            width="fit"
            onClickCb={() => {dispatch(toggleSidebar())}}
            classNames="text-2xl"
          />}
          <span className="text-primary-orange font-bold text-center  mx-2">
            Smart Inventory
          </span>
        </div>
        <div className="flex text-center justify-between items-center gap-3">
       {userDetails?.firstName && userDetails?.lastName  &&  <><span>{userDetails.firstName+" "+userDetails.lastName}</span>
        <span className="bg-primary-orange rounded-full h-10 w-10 text-center flex justify-center items-center font-medium border-1">{userDetails.firstName[0]+userDetails.lastName[0].toLocaleUpperCase()}</span></>}  
        </div>
      </div>
    </>
  );
};

export default Header;
