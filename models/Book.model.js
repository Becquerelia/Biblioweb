const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    // _id que lo crea mongo
    apiISBN: String,
    title: String, // se acordaran de esto
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"         
    },
    status: {
        type: String,
        enum: ["Pending", "Reading", "Read"]
    },
    review: String,    
})

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
