const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    apiID: String,
    title: String, // se acordaran de esto
    ownerID: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"         
        }
    ],
    status: {
        type: String,
        enum: ["Pending", "Reading", "Read"]
    },
    review: String,    
})

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
