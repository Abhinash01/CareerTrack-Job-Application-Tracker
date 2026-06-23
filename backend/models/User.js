const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },    

    location: {
      type: String,
      default: ""
    },

    careerGoal: {
      type: String,
      default: "I am focused on building my career and tracking job applications with CareerTrack."
    },

    skills: {
      type: [String],
      default: []
    },

    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
    }
  },
  {
    timestamps: true
  }
);  

module.exports = mongoose.model("User", userSchema);