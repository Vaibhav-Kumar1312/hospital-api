require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/mongoose.js");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy.js");

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/", require("./routes"));

db.connectToMongoDB();
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is up at ${port}`);
});
