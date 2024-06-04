#! /usr/bin/env node

console.log(
  'This script populates some test posts to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Post = require("./models/post");

const posts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function postCreate(index, title, content, excerpt, tags, status) {
  const postDetail = {
    title: title,
    content: content,
    excerpt: excerpt,
    author: author._id,
    tags: tags,
    status: status,
  };

  const post = new Post(postDetail);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      0,
      "Post Title 1",
      "This is the content of post 1",
      "Excerpt of post 1",
      ["tag1", "tag2"],
      "published"
    ),
    postCreate(
      1,
      "Post Title 2",
      "This is the content of post 2",
      "Excerpt of post 2",
      ["tag2", "tag3"],
      "draft"
    ),
    postCreate(
      2,
      "Post Title 3",
      "This is the content of post 3",
      "Excerpt of post 3",
      ["tag1", "tag3"],
      "archived"
    ),
    postCreate(
      3,
      "Post Title 4",
      "This is the content of post 4",
      "Excerpt of post 4",
      ["tag2", "tag4"],
      "published"
    ),
    postCreate(
      4,
      "Post Title 5",
      "This is the content of post 5",
      "Excerpt of post 5",
      ["tag3", "tag5"],
      "draft"
    ),
  ]);
}
