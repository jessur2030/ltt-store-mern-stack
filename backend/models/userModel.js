import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//create user Schema: userSchema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //compared plain text to the encrypted password
  return await bcrypt.compare(enteredPassword, this.password);
};

//add middleware to :hash password salt on pre save
userSchema.pre("save", async function (next) {
  //Note:we only want hash password field: only if its send or if its modified
  //check if is password not modified: using mongoose isModified
  if (!this.isModified("password")) {
    next();
  }

  //create a salt to hash our password  asynchronously
  const salt = await bcrypt.genSalt(10);
  //take user plain text password:  this.password : and reset it
  //to hash password, and takes salt as second argument
  this.password = await bcrypt.hash(this.password, salt);
});

//crates User model from user schema
const User = mongoose.model("User", userSchema);

//export User model
export default User;
