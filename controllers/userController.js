const { User, Thought } = require("../models");

module.exports = {
  findAllUsers: async function (req, res) {
    try {
      console.log("I hit this route");
      const allUsers = await User.find({}).select("-id");

      if (!allUsers) return res.status(404).json({ message: "No users found" });

      console.log("Are we getting here?");
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ message: "An error has occured" });
    }
  },
};