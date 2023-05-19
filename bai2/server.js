const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fs = require("fs");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
