const { Schema, Types } = require("mongoose");

const formatDate = (date) => {
  return date.toLocaleDateString("en", {
    day: "2-digit",
    year: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    maxLength: 280,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: formatDate,
  },
});

module.exports = reactionSchema;
