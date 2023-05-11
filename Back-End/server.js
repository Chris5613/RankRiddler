require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/users");
const formRoutes = require("./routers/form");
const cors = require("cors");
const path = require("path");

// server file
const app = express();
app.use(
  cors({
    origin: [
      "https://rr-front-end.onrender.com",
      "https://www.rankriddler.com",
      "http://localhost:3000",
    ],
  })
);

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

mongoose.connect(process.env.MONGO);
mongoose.connection.on("connected", () => {
  app.listen(process.env.PORT, () =>
    console.log("DB connected and server is running on port", process.env.PORT)
  );
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error " + err);
  process.exit();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", userRoutes);
app.use("/form", formRoutes);
