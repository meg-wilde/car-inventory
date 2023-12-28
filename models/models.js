const mongoose = require("mongoose");

//create schema for cars structure
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
    required: false, //colour not required
  },
});

module.exports = mongoose.model("Car", carSchema);
