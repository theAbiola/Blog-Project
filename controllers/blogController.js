import db from "../model/blogModel.js"

const getMainPage = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM posts");
        console.log(response);
        res.render("index.ejs", { posts: response.rows });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
}

const getNewPage = (req, res) => {
    res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
}

const getEditPage = async (req, res) => {
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
}

const postNewBlog = async (req, res) => {
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
}

const postBlogUpdate = async (req, res) => {
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
}

const deleteBlog = async (req, res) => {
    const postId = req.params.id;
    try {
        await db.query("DELETE FROM posts WHERE id = $1", [postId]);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
}

export { getMainPage, getNewPage, getEditPage, postNewBlog, postBlogUpdate, deleteBlog }