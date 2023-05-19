const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fs = require("fs");
const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api/v1/users", usersRoutes);
server.use("/api/v1/posts", postsRoutes);

server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
