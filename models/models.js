const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  reg_number: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Car", carSchema);
