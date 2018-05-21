const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findByUser)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/:username")
  .get(usersController.findByUser)
  .put(usersController.update);

router
    .route("/:id")
    .get(user)

module.exports = router;