const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * Defines the schema for the user collection.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
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
  },
  {
    timestamps: true,
  }
);

/**
 * Compares the candidate password with the user's stored password hash.
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} - Returns a promise resolving to true if the passwords match, otherwise false.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Represents the User model.
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
