import { rootState } from "../store/store";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAssignment,
  MdInventory,
  MdLogout,
  MdManageAccounts,
  MdSpaceDashboard,
} from "react-icons/md";
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import { LuTrendingDown } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { logoutUser } from "../pages/login-page/authSlice";
import { ADMIN, VENDOR } from "../constants/roles";

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state: rootState) => state.navs);
  const [selectedTab, setSelectedTab] = useState<string>("dashboard")
  const {isLoggedIn, userDetails}= useSelector((state:rootState)=>state.auth)

  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(()=>{
    
    const endIndexPath = location.pathname.slice(1).indexOf('/') || location.pathname.slice(1).indexOf('?')

    if(location.pathname.slice(1,endIndexPath).length>1){
      setSelectedTab(location.pathname.slice(1))
    }else{
      setSelectedTab("dashboard")
    }


  },[isLoggedIn, location])
  return (
    <>
      <div
        className={`flex flex-col  ${
          isSidebarOpen && isLoggedIn? "translate-x-0" : " translate-x-[-310px]"
        } w-[300px] min-w-[300px] bg-secondary-black h-full py-2 px-4 justify-between  duration-300 ease-in-out `}
      >
        <div className="flex flex-col">
          <Link to={'/dashboard'}>
          <Button
            btnContent={
              <span className="flex items-center gap-2">
                <MdSpaceDashboard /> Dashboard
              </span>
            }
            onClickCb={() => {
              setSelectedTab('dashboard');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'dashboard' || selectedTab == '/' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
          </Link>
          
          <Link to={'/products'}>
          <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <FaBoxOpen /> Products
              </span>
            }
            onClickCb={() => {
              setSelectedTab('products');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'products' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
          </Link>
          
          <Link to={'/orders'}>
          <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <MdAssignment /> Orders
              </span>
            }
            onClickCb={() => {
              setSelectedTab('orders');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'orders' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
          </Link>
         
        {userDetails?.role == VENDOR && <Link to={'/cart'}>
         <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <FaShoppingCart /> Cart
              </span>
            }
            onClickCb={() => {
              setSelectedTab('cart');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'cart' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
         </Link>} 
          
          
         {userDetails?.role == ADMIN &&  <Link to={'/inventory'}>
          <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <MdInventory /> Inventory
              </span>
            }
            onClickCb={() => {
              setSelectedTab('inventory');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'inventory' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
          </Link>}
          

         <Link to={'/low-stocks'}>
         <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <LuTrendingDown /> Dead Stocks
              </span>
            }
            onClickCb={() => {
              setSelectedTab('low-stocks');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'low-stocks' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
         </Link>
          

        </div>
        <div className="flex flex-col">

          {userDetails?.role == ADMIN &&  <Link to={'/manage-vendors'}>
         <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <MdManageAccounts /> Manage Vendors
              </span>
            }
            onClickCb={() => {
              setSelectedTab('manage-vendors');
            }}
            width="full"
            color="primary-white"
            bgColor={ selectedTab == 'manage-vendors' ? 'primary-orange' : 'primary-gray'}
            classNames={"text-left mb-2"}
          />
         </Link>}
          
          <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <MdLogout /> Logout
              </span>
            }
            onClickCb={() => {
              dispatch(logoutUser({navigate}));
            }}
            width="full"
            color={"primary-white"}
            bgColor={"primary-black"}
            classNames={"text-left mb-2"}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
