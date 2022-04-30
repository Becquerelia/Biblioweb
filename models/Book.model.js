const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  apiID: String,
  title: String,
  coverLink:String,
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "reading", "read"],
  },
  review: String,
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
