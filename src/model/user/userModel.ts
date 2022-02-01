import { User } from "../../interface/userInterface";
import { model, Schema } from "mongoose";
import { randomBytes, scryptSync } from "crypto";

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: String,
      minlength: 4,
      trim: true,
    },
    userName: {
      type: String,
      minlength: 4,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    apiKey:{
      type:String,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

UserSchema.statics.comparePassword = async (
  storedPassword: string,
  userPassword: string
): Promise<boolean> => {
  const [key, salt] = storedPassword.split(":");
  const userPass: string = scryptSync(userPassword, salt, 32).toString("hex");
  return userPass === key;
};
UserSchema.pre("save", function saveHook(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString("hex");
  user.password = `${scryptSync(user.password, salt, 32).toString(
    "hex"
  )}:${salt}`;
  return next();
});
export default model<User>("user", UserSchema);
