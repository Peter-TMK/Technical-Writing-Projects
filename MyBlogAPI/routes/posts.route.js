const express = require('express');
const postRouter = express.Router();
const PostController = require("../controllers/post.controller");
const { verifyToken } = require('../middleware/verifyBearerToken');
const {
    postValidationMiddleWare,
    updatePostValidationMiddleware
} = require('../validators/posts.validator')


// Create Post
postRouter.post("/", verifyToken, postValidationMiddleWare, PostController.createPost);

// Get Post by ID
postRouter.get("/:id", verifyToken, PostController.getPost);

// Get All Posts or Search by Title, author or tag
postRouter.get("/", verifyToken, PostController.getAllPosts);

// Update A Post
postRouter.put("/:id", verifyToken, updatePostValidationMiddleware, PostController.updatePost);

// Delete A Post
postRouter.delete("/:id", verifyToken, PostController.deletePost);


module.exports = postRouter