import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/ProductDetails";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "./redux/store";
import { useEffect } from "react";
import { setLogIn } from "./redux/slices/authSlice";
import Custom404 from "./pages/Custom404";

function App() {
  const { isLoggedIn, user } = useSelector((state: rootState) => state.auth);
  const dispatch = useDispatch();

  const localUser = localStorage.getItem("user");

  console.log(localUser, "localUser");
  console.log(user, "user");

  useEffect(() => {
    if (!isLoggedIn && localUser) {
      dispatch(setLogIn({ status: true, user: JSON.parse(localUser) }));
    }
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="md:h-14 h-24"></div>
      <ToastContainer theme="dark" position="bottom-right" />
      <Routes>
        <Route path="/" index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="*" element={<Custom404 />}></Route>

        {
          // protected route
          isLoggedIn && <Route path="/cart" element={<Cart />}></Route>
        }
      </Routes>
    </>
  );
}

export default App;
