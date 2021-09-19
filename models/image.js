const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: String,
  imageData: {
    data: Buffer,
    contentType: String,
  },
  artist: String,
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model("Image", imageSchema);
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
