const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const JWT_PRIVATEKEY = process.env.JWT_PRIVATEKEY;

const userSchema = new Schema(
  {
    userId: {
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
    gender: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: "Customer", //Admin , Seller
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, JWT_PRIVATEKEY, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ _id: this._id }, JWT_PRIVATEKEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  delete obj._id;
  return obj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
