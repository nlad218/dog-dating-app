const { Schema, model } = require("mongoose");

const dogProfile = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    trim: true,
    required: true,
  },
  size: {
    type: String,
    trim: true,
    required: true,
  },
  about: {
    type: String,
    trim: true,
  },
  hobbies: {
    type: Array,
  },
  // references the User model (one to one relationship)
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const DogProfile = model("DogProfile", dogProfile);

module.exports = DogProfile;
