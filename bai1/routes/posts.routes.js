const express = require("express");
const router = express.Router();
const fs = require("fs");
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));

    const index = posts.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      res.status(200).json(posts[index]);
    } else {
      res.status(404).json({
        message: "not found post",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.get("/", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.post("/", (req, res) => {
  const userInput = req.body;
  try {
    const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));
    const findPost = posts.find((e) => {
      return e.tiltle === userInput.tiltle;
    });
    if (findPost === undefined) {
      let randomId = Math.floor(Math.random() * 100000);
      let i = 0;
      while (i !== -1) {
        i = posts.indexOf((e) => {
          return e.id === randomId;
        });
        if (i !== -1) {
          randomId = Math.floor(Math.random() * 100000);
        }
      }
      const newPost = { ...userInput, id: randomId };
      posts.unshift(newPost);
      fs.writeFileSync("./user_post_api/posts.json", JSON.stringify(posts));
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.put("/:id", (req, res) => {
  console.log("does it run into line 65");
  const { id } = req.params;
  const userInput = req.body;
  try {
    const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));
    const index = posts.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      const newUserInput = { ...posts[index], ...userInput };
      posts[index] = newUserInput;
      fs.writeFileSync("./user_post_api/posts.json", JSON.stringify(posts));
      res.status(200).json(posts);
    } else {
      res.status(200).json({
        message: "user isn't exit",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.delete("/:id", (req, res) => {
  console.log("does it run in to it");
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));
    const index = posts.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      posts.splice(index, 1);
      fs.writeFileSync("./user_post_api/posts.json", JSON.stringify(posts));
      res.status(200).json(posts);
    } else {
      res.status(200).json({
        message: "user isn't exit",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
