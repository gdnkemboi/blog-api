const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const passport = require("passport");

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  res.json({ message: "Sign up succesful!" });
});

// exports.logIn = (req, res, next) => {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(400).json(info.message);

//     const payload = { id: user.id };
//     const secretKey = process.env.SECRET_KEY;
//     console.log(secretKey);
//     const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 });

//     return res.json({ message: "Auth passed!", token });
//   })(req, res, next);
// };

exports.logIn = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect username or password." });

    const payload = { id: user.id };
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ message: "Logged in successfully", token: token });
  })(req, res, next);
}

exports.logOut = (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED Log Out" });
};
