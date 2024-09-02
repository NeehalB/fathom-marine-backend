import mongoose from "mongoose";
const UserSchema = mongoose.Schema;

const userModel = new UserSchema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: false,
  },
  watchedVideo: {
    type: Array,
    required: false,
  },
});

export default mongoose.model("users", userModel);
