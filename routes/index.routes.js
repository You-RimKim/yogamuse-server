const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("this is the homepage");
});

router.get("/about", (req, res, next) => {
  res.json("this is the about page");
});

router.get("/categories", (req, res, next) => {
  res.json("here are all the categories");
});

module.exports = router;