const User = require("../models/User");

exports.findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const users = await User.find({ _id: { $ne: req.user } });

    const matches = [];

    users.forEach(user => {
      const commonWanted = user.skillsOffered.filter(skill =>
        currentUser.skillsWanted.includes(skill)
      );

      const commonOffered = user.skillsWanted.filter(skill =>
        currentUser.skillsOffered.includes(skill)
      );

      const score = (commonWanted.length + commonOffered.length) * 10;

      if (score > 0) {
        matches.push({
          userId: user._id,
          name: user.name,
          matchScore: score,
          matchReason: `${commonWanted.join(", ")} ↔ ${commonOffered.join(", ")}`
        });
      }
    });

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
