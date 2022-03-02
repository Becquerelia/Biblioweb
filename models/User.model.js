const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },  

    profilePic: {
      type: String
    }
     
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;

