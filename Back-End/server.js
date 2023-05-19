require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/users");
const formRoutes = require("./routers/form");
const cors = require("cors");
const path = require("path");
const io = require("socket.io")(3002, {
  cors: {
    origin: [
      "https://rr-front-end.onrender.com",
      "https://www.rankriddler.com",
      "http://localhost:3000",
    ],
  },
});

let playersQueue = [];

io.on("connection", (socket) => {
  socket.on("findMatch", (user) => {
    playersQueue.push(user);

    if (playersQueue.length >= 2) {
      const player1 = playersQueue.shift();
      const player2 = playersQueue.shift();
      io.emit("matchFound", player1, player2);
      io.emit("connected");
    }

    console.log("Players queue", playersQueue);
  });

  socket.on("leaveQueue", (user) => {
    const index = playersQueue.indexOf(user);
    if (index == -1) {
      playersQueue.splice(index, 1);
    }
    console.log("Players queue", playersQueue);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  }
  );
});

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
