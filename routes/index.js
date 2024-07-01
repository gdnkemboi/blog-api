var express = require("express");
var router = express.Router();
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (process.env.NODE_ENV === "production") {
    res.render("index");
  } else {
    res.redirect("/api-docs");
  }
});

module.exports = router;
