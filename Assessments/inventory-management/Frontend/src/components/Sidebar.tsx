import { rootState } from "../store/store";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAssignment,
  MdInventory,
  MdLogout,
  MdManageAccounts,
  MdSettings,
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
          isSidebarOpen && isLoggedIn? "translate-x-0" : " translate-x-[-260px]"
        } w-[250px] min-w-[250px] bg-sidebar-bg h-full py-2 px-4 justify-between  duration-300 ease-in-out border-[1px] border-table-border `}
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
            color={selectedTab == 'dashboard' || selectedTab == '/' ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
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
            color={selectedTab == 'products'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
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
            color={selectedTab == 'orders' ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
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
            color={selectedTab == 'cart'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
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
            color={selectedTab == 'inventory'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark drop-shadow-none"}
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
            color={selectedTab == 'low-stocks'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
          />
         </Link>
          

        </div>
        <div className="flex flex-col border-t-[1px] border-table-border pt-2">

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
            color={selectedTab == 'manage-vendors'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
          />
         </Link>}

         {userDetails?.role == VENDOR &&  <Link to={'/settings'}>
         <Button
            btnContent={
              <span className="flex items-center gap-2">
                {" "}
                <MdSettings />Settings
              </span>
            }
            onClickCb={() => {
              setSelectedTab('settings');
            }}
            width="full"
            color={selectedTab == 'settings'  ? 'dark-orange' :'text-dark'}
            bgColor='primary-white'
            classNames={"text-left mb-2 hover:bg-header-bg hover:text-text-dark"}
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
            bgColor={"dark-orange"}
            classNames={"text-left mb-2"}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
