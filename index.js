import express from "express";
import bodyParser from "body-parser";
// import axios from "axios";
import env from "dotenv";
import pg from "pg";

const app = express();
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

const port = process.env.APPLICATION_PORT;
const API_URL = process.env.API_URL;

app.use(express.static("public")); //allows us save static files in the public folder

app.use(bodyParser.urlencoded({ extended: true })); //Necessary to parse other formats of data as urlencoded data

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM posts");
    console.log(response);
    res.render("index.ejs", { posts: response.rows });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the new post page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the edit page
app.get("/edit/:id", async (req, res) => {
  const postId = req.params.id; //this req.params.id is coming from the ejs side. It is the endpoint that the user hits up from the form.
  try {
    const response = await db.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);
    console.log(response.rows[0]);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/blog/posts", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const response = await db.query(
      "INSERT INTO posts (title, content, author) VALUES($1, $2, $3)",
      [title, content, author]
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/blog/posts/:id", async (req, res) => {
  console.log("called");
  const { title, content, author } = req.body;
  const userId = req.params.id;
  try {
    const response = await db.query(
      "UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4",
      [title, content, author, userId]
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/blog/posts/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    await db.query("DELETE FROM posts WHERE id = $1", [postId]);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
