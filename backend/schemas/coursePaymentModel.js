const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },

    paymentMode: {
      type: String,
      default: "ONLINE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoursePayment", coursePaymentSchema);
