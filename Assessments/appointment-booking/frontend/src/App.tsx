import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unauthenticated from "./Layout/Unauthenticated";
import Login from "./pages/Login";

import Authenticated from "./Layout/Authenticated";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Patient from "./pages/Patient";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Unauthenticated />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Authenticated />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/patient" element={<Patient />} />
          <Route path="/dashboard/Doctor" element={<Doctor />} />
          <Route path="/dashboard/appointment" element={<Appointment />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
