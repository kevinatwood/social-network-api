const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let userCheck = await connection.db
    .listCollections({ name: "user" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("user");
  }
  let thoughtCheck = await connection.db
    .listCollections({ name: "thought" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thought");
  }

  await User.collection.insertMany([
    {
      username: "kevin",
      email: "atwoodkevin22@gmail.com",
    },
    {
      username: "minna",
      email: "minna@gmail.com",
    },
    {
      username: "dan",
      email: "dan@gmail.com",
    },
  ]);

  await Thought.collection.insertMany([
    {
        thoughtText: 'hello world', 
        username: 'kevin',
        reactions: [{
            reactionBody: 'yass queen',
            username: 'minna',
        }]
    }
  ])
});
