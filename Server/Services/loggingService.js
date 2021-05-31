const db = require("../Models");
const Model = db.logs;


exports.logQuery = (req, res, next) => {
    let userid = req.authedID || "API";
    try {
        let record = {
          Action:req.method,
          User:userid,
          Source:"test",
          Data:req.url
        }
        Model.create(record);
        next();
    } catch (err) {
      let a = err;
      // res.status(500).send({
      //   message: `Error logging query`
      // });
    }
  };
