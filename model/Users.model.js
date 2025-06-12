const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3, // Use minlength instead of min
      maxlength: 20, // Use maxlength instead of max
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    photo:{
      type:String,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: false,
    },
    citizenshipNo:{
      type:String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = model("Users", UserSchema); // Changed model name to "User"

