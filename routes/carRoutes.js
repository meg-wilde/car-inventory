const express = require("express");
const router = express.Router();
const carController = require("../controllers/car.controller");

// Routes
router.post("/api/cars", carController.createCar);
router.get("/api/cars", carController.findAllCars);
router.put("/api/cars/:id", carController.updateCarById);
router.put("/api/cars", carController.updateCarsByMake);
router.delete("/api/cars/:id", carController.deleteCarById);
router.delete("/api/cars", carController.deleteCarsByMake);
router.get("/api/older-cars", carController.listOlderCars);

module.exports = router;
