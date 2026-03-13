const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../models/Post");


// CREATE POST
router.post("/", auth, async (req, res) => {
    try {

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// GET ALL POSTS
router.get("/", async (req, res) => {
    try {

        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// GET SINGLE POST
router.get("/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json(post);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// UPDATE POST
router.put("/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        await post.save();

        res.json(post);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});


// DELETE POST
router.delete("/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.deleteOne();

        res.json({ msg: "Post deleted" });

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;

module.exports = router;