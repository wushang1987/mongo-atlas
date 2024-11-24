import express from "express";
import { responseFormat } from "./common";
import Post from "../models/postModel";

var router = express.Router();

router.post("/add", async (req, res, next) => {
  const silence = new Post({
    title: req.body.title,
    content: req.body.content,
    createTime: req.body.createTime,
    updateTime: req.body.updateTime,
  });
  const findResult = await Post.find({ title: req.body.title });
  console.log(findResult);
  if (findResult.length > 0) {
    res.send(responseFormat("post is exist"));
  } else {
    silence.save();
    res.send(responseFormat("ok"));
  }
});

router.get("/allPost", async (req, res, next) => {
  const post = await Post.find({});
  console.log(post);
  if (post.length > 0) {
    res.send(responseFormat({ allPost: post }));
  } else {
    res.send(responseFormat({ allPost: null }));
  }
});

export default router;
