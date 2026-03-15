const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");


// CREATE RIDE
router.post("/create", async (req, res) => {
  try {

    const { from, to, date, seatsAvailable, price } = req.body;

    const ride = new Ride({
      from,
      to,
      date,
      seatsAvailable,
      price
    });

    await ride.save();

    res.json({
      message: "Ride created successfully",
      ride
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// SEARCH RIDES
router.get("/search", async (req, res) => {
  try {

    const { from, to } = req.query;

    const rides = await Ride.find({
      from: new RegExp(from, "i"),
      to: new RegExp(to, "i")
    });

    res.json(rides);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// JOIN RIDE
router.post("/:rideId/join", async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: "Ride full" });
    }

    ride.seatsAvailable -= 1;

    await ride.save();

    res.json({ message: "Successfully joined ride" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET ALL RIDES
router.get("/", async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET RIDES CREATED BY USER
router.get("/my-created/:userId", async (req, res) => {
  try {

    const rides = await Ride.find({
      driver: req.params.userId
    });

    res.json(rides);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET RIDES JOINED BY USER
router.get("/my-joined/:userId", async (req, res) => {
  try {

    const rides = await Ride.find({
      passengers: req.params.userId
    });

    res.json(rides);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET PASSENGERS OF A RIDE
router.get("/:rideId/passengers", async (req, res) => {
  try {

    const ride = await Ride.findById(req.params.rideId)
      .populate("passengers");

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json(ride.passengers);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
