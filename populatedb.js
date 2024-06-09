#!/usr/bin/env node

console.log(
  'This script populates some test comments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Post = require("./models/post");
const Comment = require("./models/comment");

const comments = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
const mongoDB = userArgs[0];

const author = {
  _id: "665d929876ccc44ad11c40c6",
  username: "gideon",
  password: "$2a$10$WfOG3h8/CgOOMWhvL79tDu9E.a75SVJGedYetHHILxRPoQ4GDVgqy",
  role: "user",
  createdAt: "2024-06-03T09:51:53.928Z",
  __v: 0,
};

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function commentCreate(index, post, content, parentComment, status) {
  const commentDetail = {
    post: post,
    author: author._id,
    content: content,
    parentComment: parentComment,
    status: status,
  };

  const comment = new Comment(commentDetail);
  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${content}`);

  // If there's a parent comment, update its replies array
  if (parentComment) {
    await Comment.findByIdAndUpdate(parentComment, {
      $push: { replies: comment._id },
    });
  }
}

async function createComments() {
  console.log("Adding comments");
  const posts = await Post.find().exec();

  if (posts.length === 0) {
    console.log("No posts found. Please populate the posts collection first.");
    return;
  }

  // Sequentially create comments
  await commentCreate(
    0,
    posts[0]._id,
    "This is the content of comment 1",
    null,
    "approved"
  );
  await commentCreate(
    1,
    posts[0]._id,
    "This is the content of comment 2",
    null,
    "approved"
  );
  await commentCreate(
    2,
    posts[0]._id,
    "This is the content of comment 3",
    null,
    "approved"
  );
  await commentCreate(
    3,
    posts[0]._id,
    "This is the content of comment 4",
    null,
    "approved"
  );
  await commentCreate(
    4,
    posts[0]._id,
    "This is the content of comment 5",
    null,
    "approved"
  );
  await commentCreate(
    5,
    posts[0]._id,
    "This is the content of reply to comment 1",
    comments[0]._id,
    "approved"
  );
  await commentCreate(
    6,
    posts[0]._id,
    "This is the content of reply to comment 2",
    comments[1]._id,
    "approved"
  );
  await commentCreate(
    7,
    posts[0]._id,
    "This is the content of reply to comment 3",
    comments[2]._id,
    "approved"
  );
  await commentCreate(
    8,
    posts[0]._id,
    "This is the content of reply to comment 4",
    comments[3]._id,
    "approved"
  );
  await commentCreate(
    9,
    posts[0]._id,
    "This is the content of reply to reply to comment 1",
    comments[5]._id,
    "approved"
  );

  await commentCreate(
    10,
    posts[1]._id,
    "This is the content of comment 6",
    null,
    "approved"
  );
  await commentCreate(
    11,
    posts[1]._id,
    "This is the content of comment 7",
    null,
    "approved"
  );
  await commentCreate(
    12,
    posts[1]._id,
    "This is the content of comment 8",
    null,
    "approved"
  );
  await commentCreate(
    13,
    posts[1]._id,
    "This is the content of comment 9",
    null,
    "approved"
  );
  await commentCreate(
    14,
    posts[1]._id,
    "This is the content of comment 10",
    null,
    "approved"
  );
  await commentCreate(
    15,
    posts[1]._id,
    "This is the content of reply to comment 6",
    comments[10]._id,
    "approved"
  );
  await commentCreate(
    16,
    posts[1]._id,
    "This is the content of reply to comment 7",
    comments[11]._id,
    "approved"
  );
  await commentCreate(
    17,
    posts[1]._id,
    "This is the content of reply to comment 8",
    comments[12]._id,
    "approved"
  );
  await commentCreate(
    18,
    posts[1]._id,
    "This is the content of reply to comment 9",
    comments[13]._id,
    "approved"
  );
  await commentCreate(
    19,
    posts[1]._id,
    "This is the content of reply to reply to comment 6",
    comments[15]._id,
    "approved"
  );

  await commentCreate(
    20,
    posts[2]._id,
    "This is the content of comment 11",
    null,
    "approved"
  );
  await commentCreate(
    21,
    posts[2]._id,
    "This is the content of comment 12",
    null,
    "approved"
  );
  await commentCreate(
    22,
    posts[2]._id,
    "This is the content of comment 13",
    null,
    "approved"
  );
  await commentCreate(
    23,
    posts[2]._id,
    "This is the content of comment 14",
    null,
    "approved"
  );
  await commentCreate(
    24,
    posts[2]._id,
    "This is the content of comment 15",
    null,
    "approved"
  );
  await commentCreate(
    25,
    posts[2]._id,
    "This is the content of reply to comment 11",
    comments[20]._id,
    "approved"
  );
  await commentCreate(
    26,
    posts[2]._id,
    "This is the content of reply to comment 12",
    comments[21]._id,
    "approved"
  );
  await commentCreate(
    27,
    posts[2]._id,
    "This is the content of reply to comment 13",
    comments[22]._id,
    "approved"
  );
  await commentCreate(
    28,
    posts[2]._id,
    "This is the content of reply to comment 14",
    comments[23]._id,
    "approved"
  );
  await commentCreate(
    29,
    posts[2]._id,
    "This is the content of reply to reply to comment 11",
    comments[25]._id,
    "approved"
  );
}
