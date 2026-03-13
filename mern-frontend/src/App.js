import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyRides from "./pages/MyRides";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchRides from "./pages/SearchRides";
import CreateRide from "./pages/CreateRide";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<SearchRides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-ride" element={<CreateRide />} />
        <Route path="/search" element={<SearchRides />} />
        <Route path="/my-rides" element={<MyRides />} />
      </Routes>

    </Router>
  );
}

export default App;