const mongoose = require("mongoose");
const { Schema } = mongoose;
const profileSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
