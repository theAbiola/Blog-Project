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
router.get("/",);

// Route to render the new post page
router.get("/new",);

// Route to render the edit page
router.get("/edit/:id",);

// Create a new post
router.post("/blog/posts",);

// Partially update a post
router.post("/blog/posts/:id",);

// Delete a post
router.get("/blog/posts/delete/:id",);