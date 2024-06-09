const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  status: {
    type: String,
    enum: ["approved", "spam"],
    default: "approved",
  },
});

CommentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
