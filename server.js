const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

//Initialize app variable with express
const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

var corsOptions = 
{
    origin: 'http://localhost:3000'
}

app.get("/", (req, res) => res.send("API is running"));

// Define routes
app.use("/api/auth", cors(), require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));