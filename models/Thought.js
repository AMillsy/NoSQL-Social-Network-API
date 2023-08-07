const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
// REPLACE THE REACTIONS SCHEMA WITH THE ACTUAL ONE
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      match: `/^.{1,280}$/`,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
