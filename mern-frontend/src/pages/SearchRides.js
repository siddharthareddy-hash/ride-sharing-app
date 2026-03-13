import { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function SearchRides() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rides, setRides] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {

      const res = await axios.get(
        `${API}/api/rides/search?from=${from}&to=${to}`
      );

      setRides(res.data);
      setSearched(true);

    } catch (err) {
      console.error(err);
    }
  };

  const joinRide = async (rideId) => {
    try {

      const res = await axios.post(
        `${API}/api/rides/${rideId}/join`
      );

      alert(res.data.message);

      handleSearch();

    } catch (err) {
      console.error(err);
      alert("Error joining ride");
    }
  };

  return (
    <div>

      <h2>Search Rides</h2>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <h3>Available Rides</h3>

      {rides.length > 0 ? (
        rides.map((ride) => (
          <div
            key={ride._id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          >
            <p><b>{ride.from} → {ride.to}</b></p>
            <p>Date: {ride.date}</p>
            <p>Seats Available: {ride.seatsAvailable}</p>
            <p>Price: ₹{ride.price}</p>

            {ride.seatsAvailable === 0 ? (
              <button disabled>Ride Full</button>
            ) : (
              <button onClick={() => joinRide(ride._id)}>
                Join Ride
              </button>
            )}
          </div>
        ))
      ) : (
        searched && <p>No rides found</p>
      )}

    </div>
  );
}

export default SearchRides;

export default SearchRides;


