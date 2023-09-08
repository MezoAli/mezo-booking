import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: [30, "name can't be longer than 30 characters"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: [6, "password should be atleast 6 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.setResetPasswordToken = function () {
//   const resetToken = crypto.createHash("");

//   this.resetPasswordExpire = Date.now() + 60 * 30 * 1000;

//   return resetToken;
// };

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
