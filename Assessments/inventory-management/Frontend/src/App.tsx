import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "./store/store";
import Router from "./router/Router";
import { useEffect } from "react";
import { setLogin } from "./pages/login-page/authSlice";

function App() {
  const { isSidebarOpen } = useSelector((state: rootState) => state.navs);
  const { isLoggedIn } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch()


  useEffect(()=>{
     const token = localStorage.getItem('token')
     if(token && !isLoggedIn){
        dispatch(setLogin())
     }
  })
 

  return (
    <>
      <Header/>
      <div className="h-[10vh]"></div>
      <div className="flex h-[90vh]">
       <Sidebar/>
        <div
          className={` duration-300 ease-in-out   ${
            isSidebarOpen && isLoggedIn
              ? "translate-x-0 w-full"
              : "translate-x-[-300px] min-w-[100vw]"
          } px-5`}
        >
         <Router/>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
