const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

//Initialize app variable with express
const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

// Define routes
app.use("/api/auth", cors(), require("./routes/api/auth"));
app.use("/api/users", cors(), require("./routes/api/users"));
app.use("/api/profile", cors(), require("./routes/api/profile"));
app.use("/api/posts", cors(), require("./routes/api/posts"));

// Serve static assets in production
if(process.env.NODE_ENV === "production")
{
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));