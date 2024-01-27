const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController.js");

router.use("/doctors", require("./doctors.js"));
router.use("/patients", require("./patients.js"));

router.get("/reports/:status", reportController.filteredReport);

module.exports = router;
