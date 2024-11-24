import express from "express";
import { responseFormat } from "./common";
import Post from "../models/postModel";

var router = express.Router();

router.post("/add", async (req, res, next) => {
  const silence = new Post({
    title: req.body.title,
    content: req.body.content,
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

export default router;
