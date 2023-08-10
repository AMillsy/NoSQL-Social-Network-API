const router = require("express").Router();

const {
  findAllUsers,
  findSingleUser,
  createNewUser,
  updateUser,
} = require("../../controllers/userController");

router.route("/").get(findAllUsers).post(createNewUser);
router.route("/:id").get(findSingleUser).put(updateUser);
module.exports = router;
