const User = require("../model/user.js");
const Report = require("../model/report.js");

module.exports.register = async function (req, res) {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.number });
    if (user) {
      return res.status(200).json({
        message: "Patient already exists",
        data: { patient: user },
      });
    }
    const newPatient = User.create({
      username: req.body.number,
      password: req.body.number,
      name: req.body.name,
      type: "patient",
    });
    return res.status(200).json({
      status: "Sucess",
      message: "Patient info created",
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status.json({
        message: "Internal server error",
      });
    }
  }
};

module.exports.createReport = async function (req, res) {
  try {
    const newReport = await Report.create({
      createdByDoctor: req.user.id,
      status: req.body.status,
    });
    const patient = await User.findById(req.params.id);
    const doctor = await User.findById(req.user.id);
    doctor.report.push(newReport);
    doctor.save();
    patient.report.push(newReport);
    patient.save();
    return res.status(200).json({
      status: "success",
      message: "Report Created Succesfully",
      data: { data: newReport },
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
  }
};
module.exports.allReport = async function (req, res) {
  const allReportOfPatient = await User.findById(req.params.id)
    .populate({
      path: "report",
      options: {
        sort: { createdAt: "asc" },
      },
    })
    .exec();
  return res.status(200).json({
    status: "Success",
    data: { data: allReportOfPatient.report },
  });
};
