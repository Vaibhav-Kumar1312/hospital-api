require("dotenv").config();
const mongoose = require("mongoose");

module.exports.connectToMongoDB = function connectToMongoDB() {
  try {
    mongoose.connect(process.env.MONGOD_CONNECT_URI);
    console.log("DB is Connected");
  } catch (err) {
    console.log(err);
  }
};
