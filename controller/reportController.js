const Report = require("../model/report.js");

module.exports.filteredReport = async function (req, res) {
  try {
    const filteredReport = await Report.find({ status: req.params.status });
    return res.status(200).json({
      status: "Success",
      data: {
        data: filteredReport,
      },
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "Fail",
        message: "Internal server error",
      });
    }
  }
};
