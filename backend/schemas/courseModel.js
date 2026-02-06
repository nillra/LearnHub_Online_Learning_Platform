const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    C_educator: {
      type: String,
      required: [true,"name is required"],
    },

    C_categories: {
      type: String,
      required: [true,"C_categories is required"],
    },

    C_title: {
      type: String,
      required: [true,"C_title is required"],
    },

    C_description: {
      type: String,
      required: [true,"C_description is required"],
    },

    sections: {
      type: Array,
      default: [],
    },

    C_price: {
      type: Number,
      required: true,
    },

    enrolled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
