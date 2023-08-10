const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);
router.route("/:id").get(getSingleThought).put(updateThought);

module.exports = router;
