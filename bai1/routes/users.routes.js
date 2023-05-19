const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const fs = require("fs");
router.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    console.log(users, "user line 8");
    const index = users.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      res.status(200).json(users[index]);
    } else {
      res.status(404).json({
        message: "not found user",
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
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  console.log("does it run into this ?");
  try {
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    const index = users.findIndex((e) => {
      return e.id.toString() === id;
    });
    console.log("??/ index ==-1", index);
    if (index !== -1) {
      const posts = JSON.parse(fs.readFileSync("./user_post_api/posts.json"));
      const indexPostRender = posts.filter((e) => {
        return e.userId === users[index].id;
      });
      console.log(indexPostRender, "line 50");
      if (indexPostRender.length !== 0) {
        res.json(indexPostRender);
      } else {
        res.json({ message: "not found user" });
      }
    } else {
      res.json({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.post("/", (req, res) => {
  const userInput = req.body;
  try {
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    console.log(users, "does it run over read");
    const findUser = users.find((e) => {
      return e.email === userInput.email;
    });
    if (findUser === undefined) {
      let randomId = Math.floor(Math.random() * 100000);
      let i = 0;
      while (i !== -1) {
        i = users.indexOf((e) => {
          return e.id === randomId;
        });
        if (i !== -1) {
          randomId = Math.floor(Math.random() * 100000);
        }
      }
      const newUser = { ...userInput, id: randomId };
      users.unshift(newUser);
      fs.writeFileSync("./user_post_api/users.json", JSON.stringify(users));
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userInput = req.body;
  try {
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    const index = users.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      const newUserInput = { ...users[index], ...userInput };
      users[index] = newUserInput;
      fs.writeFileSync("./user_post_api/users.json", JSON.stringify(users));
      res.status(200).json(users);
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
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./user_post_api/users.json"));
    const index = users.findIndex((e) => {
      return e.id.toString() === id;
    });
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFileSync("./user_post_api/users.json", JSON.stringify(users));
      res.status(200).json(users);
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
