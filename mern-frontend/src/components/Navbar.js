import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>RideShare</h2>

      <Link to="/">Home</Link>
      <Link to="/search">Search Rides</Link>
      <Link to="/create">Create Ride</Link>
      <Link to="/login">Login</Link>
      <Link to="/my-rides">My Rides</Link>
    </nav>
  );
}

export default Navbar;