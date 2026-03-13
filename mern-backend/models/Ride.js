const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

rideSchema.index({ from: 1, to: 1, date: 1 });

module.exports = mongoose.model("Ride", rideSchema);