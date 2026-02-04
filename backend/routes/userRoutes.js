const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { updateSkills } = require("../controllers/userController");

// UPDATE skills
router.put("/skills", protect, updateSkills);

module.exports = router;
