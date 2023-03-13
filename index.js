const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post.js");
const userRoutes = require("./routes/user.js");
const commentRoutes = require("./routes/comment.js")

const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()

// create an express app
const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);



const PORT = 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
.then(() => app.listen(PORT, () => console.log(`Server running at port ${PORT}`)))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
})

// app.listen(PORT, () => console.log(`Server running at port ${PORT}`))