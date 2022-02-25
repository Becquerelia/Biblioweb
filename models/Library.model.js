const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
    apiID: String,
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

const LibraryModel = mongoose.model("Library", librarySchema);

module.exports = LibraryModel;
