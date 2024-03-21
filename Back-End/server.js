require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/users");
const formRoutes = require("./routers/form");
const videoRoutes = require("./routers/videoRoutes");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: [
      "https://rr-front-end.onrender.com",
      "https://www.rankriddler.com",
      "http://localhost:3000",
      "https://test-server-rr.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let playersWaiting = [];
let queueResetTimer = null;

const resetQueue = () => {
  console.log("Resetting queue due to insufficient players.");
  playersWaiting = [];
};

const startQueueResetTimer = () => {
  if (queueResetTimer !== null) {
    clearTimeout(queueResetTimer);
  }

  queueResetTimer = setTimeout(() => {
    if (playersWaiting.length < 2) {
      resetQueue();
    }
    queueResetTimer = null;
  }, 60000);
};

io.on("connection", (socket) => {
  socket.on("playGame", (data) => {
    const playerName = data.name;
    const isPlayerInQueue = playersWaiting.some(
      (player) => player.name === playerName
    );

    if (!isPlayerInQueue) {
      playersWaiting.push({ name: playerName, id: socket.id });

      console.log(playerName + " has been added to queue");
      startQueueResetTimer();
    }

    if (playersWaiting.length >= 2) {
      const [player1, player2] = playersWaiting.splice(0, 2);
      io.to(player1.id).emit("matchFound", { opponent: player2.name });
      io.to(player2.id).emit("matchFound", { opponent: player1.name });
      console.log(player1 + " has been match with " + player2);
    }
  });

  socket.on("disconnectPlayer", () => {
    const index = playersWaiting.findIndex((player) => player.id === socket.id);
    if (index !== -1) {
      playersWaiting.splice(index, 1);
    }
  });
});

app.use(
  cors({
    origin: [
      "https://rr-front-end.onrender.com",
      "https://test-server-rr.onrender.com",
      "https://www.rankriddler.com",
      "http://localhost:3000",
      "https://rankriddler-test.onrender.com",
    ],
  })
);

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

mongoose.connect(process.env.MONGO);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
  process.exit();
});

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/", userRoutes);
app.use("/form", formRoutes);
app.use("/videos", videoRoutes);

const port = process.env.PORT || 3004;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
