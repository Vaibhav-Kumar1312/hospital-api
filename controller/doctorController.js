const User = require("../model/user.js");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  //   console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      type: "doctor",
    });
    // console.log("user---------", newUser);
    return res.status(200).json({
      status: "Success",
      message: "User created",
      data: { newUser },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(500).json({
        status: "Fail",
        message: "Username already exist",
      });
    }
    if (err) {
      return res.status(500).json({
        status: "Fail",
        message: "internal server error",
      });
    }
  }
};

exports.login = async function (req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({
        status: "fail",
        message: "Invalid Username or Password",
      });
    }
    return res.status(200).json({
      status: "sucess",
      message: "Login sucessfull here is your token",
      data: {
        token: jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
          expiresIn: "1000000",
        }),
      },
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "Fail",
        message: "internal server error",
      });
    }
  }
};
