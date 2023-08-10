const router = require("express").Router();

const {
  findAllUsers,
  findSingleUser,
  createNewUser,
} = require("../../controllers/userController");

router.route("/").get(findAllUsers).post(createNewUser);
router.get("/:id", findSingleUser);
module.exports = router;
