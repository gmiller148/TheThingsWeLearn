const mongoose = require("mongoose");
const DB_URI = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;

connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
};

close = () => {
  return mongoose.disconnect();
};

module.exports = { connect, close };
