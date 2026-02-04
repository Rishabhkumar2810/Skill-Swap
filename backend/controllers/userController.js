const User = require("../models/User");

// UPDATE SKILLS
exports.updateSkills = async (req, res) => {
  try {
    const { skillsOffered, skillsWanted } = req.body;

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (skillsOffered) user.skillsOffered = skillsOffered;
    if (skillsWanted) user.skillsWanted = skillsWanted;

    await user.save();

    res.json({
      message: "Skills updated successfully",
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
