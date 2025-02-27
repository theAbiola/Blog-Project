import express from "express";
import {
    getMainPage,
    getNewPage,
    getEditPage,
    postNewBlog,
    postBlogUpdate,
    deleteBlog
} from "../controllers/blogController.js"

const router = express.Router();

// Route to render the main page
router.get("/", getMainPage);

// Route to render the new post page
router.get("/new", getNewPage);

// Route to render the edit page
router.get("/edit/:id", getEditPage);

// Create a new post
router.post("/blog/posts", postNewBlog);

// Partially update a post
router.post("/blog/posts/:id", postBlogUpdate);

// Delete a post
router.get("/blog/posts/delete/:id", deleteBlog);

export default router;