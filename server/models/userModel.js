//mongoose schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  currentGameNumber: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
