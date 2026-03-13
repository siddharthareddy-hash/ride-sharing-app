import { useState } from "react";
import axios from "axios";

function CreateRide() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post("https://ride-sharing-app.onrender.com/api/rides/create", {
        from,
        to,
        date,
         seatsAvailable: seats,
        price
      });

      alert("Ride created successfully");
      console.log(res.data);

    } catch (err) {
      console.error(err);
      alert("Error creating ride");
    }
  };

  return (
    <div>
      <h2>Create Ride</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="From"
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To"
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Seats"
          onChange={(e) => setSeats(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Create Ride</button>

      </form>
    </div>
  );
}

export default CreateRide;