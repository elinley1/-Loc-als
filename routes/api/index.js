const router = require("express").Router();
const userRoutes = require("./users");
const businessRoutes = require("./businesses");
const blogRoutes = require("./blogs");

// User routes
router.use("/users", userRoutes);
// Business routes
router.use("businesses", businessRoutes);
// Blog routes
router.use("/blogs", blogRoutes);

module.exports = router;
