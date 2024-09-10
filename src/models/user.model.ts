import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: { type: String, required: true, trim: true, index: true },
    avatar: { type: String, required: true },
    coverimage: { type: String },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Next is the way to pass the request parameters between components
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // Short lived accesstoken
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // Short lived accesstoken
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! }
  );
};

// Mongo DB will automatically convert the model name into lower case
// it will also make it plural and then create a document
export const User = mongoose.model("User", userSchema);
