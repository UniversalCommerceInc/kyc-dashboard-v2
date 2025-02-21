import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CustomerDetail from "./components/KycDetails";
import KycTable from "./components/KycTable";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();

  // Define the routes where the Navbar should not be shown
  const hideNavbarRoutes = ["/signin"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      {shouldShowNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route path="/dashboard" element={<PrivateRoute/>} >

     
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/kyc-list" element={<KycTable />} />
        <Route path="/dashboard/customer/:id" element={<CustomerDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/signin" />} />

      </Routes>
    </div>
  );
}

export default App;
