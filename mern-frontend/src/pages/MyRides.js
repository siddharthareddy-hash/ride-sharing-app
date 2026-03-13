import { useEffect, useState } from "react";
import axios from "axios";

function MyRides() {

  const [created, setCreated] = useState([]);
  const [joined, setJoined] = useState([]);

  const userId = "69a93a9bf0c2ebf62eb5911b";

  useEffect(() => {

    axios.get(`https://ride-sharing-app.onrender.com/api/rides/my-created/${userId}`)
      .then(res => setCreated(res.data));

    axios.get(`https://ride-sharing-app.onrender.com/api/rides/my-joined/${userId}`)
      .then(res => setJoined(res.data));

  }, []);

  // GET PASSENGERS
  const getPassengers = async (rideId) => {
    try {

      const res = await axios.get(
        `https://ride-sharing-app.onrender.com/api/rides/${rideId}/passengers`
      );

      const passengers = res.data;

      if (passengers.length === 0) {
        alert("No passengers joined yet");
      } else {
        alert("Passengers joined: " + passengers.length);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      <h2>My Created Rides</h2>

      {created.map(ride => (
        <div key={ride._id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>

          <p><b>{ride.from} → {ride.to}</b></p>

          <button onClick={() => getPassengers(ride._id)}>
            View Passengers
          </button>

        </div>
      ))}

      <h2>My Joined Rides</h2>

      {joined.map(ride => (
        <div key={ride._id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>

          <p><b>{ride.from} → {ride.to}</b></p>

        </div>
      ))}

    </div>
  );
}

export default MyRides;