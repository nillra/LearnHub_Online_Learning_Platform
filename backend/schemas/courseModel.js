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
      required: true,
    },

    C_categories: {
      type: String,
      required: true,
    },

    C_title: {
      type: String,
      required: true,
    },

    C_description: {
      type: String,
      required: true,
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
