import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
env.config();

const port = process.env.APPLICATION_PORT;

app.use(express.static("public")); //allows us save static files in the public folder

app.use(bodyParser.urlencoded({ extended: true })); //Necessary to parse other formats of data as urlencoded data


app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
