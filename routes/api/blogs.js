const router = require("express").Router();
const usersController = require("../../controllers/blogsController");

// Matches with "/api/blogs"
router.route("/api/blogs")
  .get(usersController.findById)
  .post(usersController.findByBusiness);

// Matches with "/api/blogs/:id"
router
  .route("/:businessid")
  .get(usersController.findByUser)
  .put(usersController.update);

// Matches with "api/blogs/create"
router
    .route("/api/blogs/create")
    .get(userController.findByUser)
    .put(userController.create);


  
module.exports = router;