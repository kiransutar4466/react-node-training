import { headerData } from "./data/headerData";
import "./App.css";

import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <div className="h-[100vh]">
        <Navbar headerData={headerData} />
        
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                {" "}
                <Home />
              </Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
