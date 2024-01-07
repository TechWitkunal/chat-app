const mongoose = require("mongoose");

const InviteLink = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    friends: Array,
  },
  { timestamps: true }
);

const URL = mongoose.model("InviteLink", InviteLink);

module.exports = URL;
