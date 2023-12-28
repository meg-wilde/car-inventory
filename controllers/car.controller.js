const Car = require("../models/models.js");

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.json(savedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find all cars
exports.findAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update car by ID
exports.updateCarById = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update cars by make
exports.updateCarsByMake = async (req, res) => {
  const { make, updateData } = req.body;
  try {
    const updatedCars = await Car.updateMany(
      { make: make },
      { $set: updateData },
      { new: true }
    );
    res.json(updatedCars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete car by ID
exports.deleteCarById = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    res.json(deletedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete cars by make
exports.deleteCarsByMake = async (req, res) => {
  const { make } = req.body;
  try {
    const deletedCars = await Car.deleteMany({ make: make });
    res.json(deletedCars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List cars older than 5 years
exports.listOlderCars = async (req, res) => {
  const fiveYearsAgo = new Date().getFullYear() - 5;
  try {
    const olderCars = await Car.find({
      model: { $lt: fiveYearsAgo },
    });
    res.json(olderCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
