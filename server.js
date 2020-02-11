const express = require("express");
const dotenv = require("dotenv");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Handlebars setup
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// Home route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Party routes
app.use("/parties", require("./routes/parties"));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
