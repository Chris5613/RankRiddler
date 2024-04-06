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

let valQueue = [], leagueQueue = [], overwatchQueue = [], cs2Queue = [];
let queueTimers = { val: null, league: null, overwatch: null, cs2: null };

const resetQueue = (queueName) => {
  console.log(`Resetting ${queueName} queue due to inactivity.`);
  if (queueName === 'val') valQueue = [];
  else if (queueName === 'league') leagueQueue = [];
  else if (queueName === 'overwatch') overwatchQueue = [];
  else if (queueName === 'cs2') cs2Queue = [];
};

const startQueueResetTimer = (queueName) => {
  // Clear any existing timer for this queue
  if (queueTimers[queueName]) {
    clearTimeout(queueTimers[queueName]);
  }
  
  // Set a new timer for the queue
  queueTimers[queueName] = setTimeout(() => {
    resetQueue(queueName);
    queueTimers[queueName] = null; // Clear the timer reference after executing
  }, 60000); // 60 seconds
};

const matchPlayers = (queue, queueName) => {
  while (queue.length >= 2) {
    const player1 = queue.shift();
    const player2 = queue.shift();
    io.to(player1.id).emit("matchFound", { opponent: player2.name, game: queueName });
    io.to(player2.id).emit("matchFound", { opponent: player1.name, game: queueName });
    console.log(`${player1.name} has been matched with ${player2.name} in ${queueName}`);
  }
  // If players remain in the queue after attempting to match, restart the timer
  if (queue.length > 0) {
    startQueueResetTimer(queueName);
  } else {
    // Clear the timer if no players are left in the queue
    if (queueTimers[queueName]) {
      clearTimeout(queueTimers[queueName]);
      queueTimers[queueName] = null;
    }
  }
};

io.on("connection", (socket) => {
  socket.on("playGame", (data) => {
    const playerName = data.playerName;
    const game = data.game;
    let targetQueue, queueName;

    switch (game) {
      case 'valorant':
        targetQueue = valQueue;
        queueName = 'val';
        break;
      case 'league':
        targetQueue = leagueQueue;
        queueName = 'league';
        break;
      case 'overwatch':
        targetQueue = overwatchQueue;
        queueName = 'overwatch';
        break;
      case 'cs2':
        targetQueue = cs2Queue;
        queueName = 'cs2';
        break;
      default:
        console.log(`Game ${game} is not supported.`);
        return;
    }

    const isPlayerInQueue = targetQueue.some(player => player.name === playerName);
    if (!isPlayerInQueue) {
      targetQueue.push({ name: playerName, id: socket.id });
      console.log(`${playerName} has been added to the ${game} queue`);
      matchPlayers(targetQueue, queueName); // Attempt to match immediately
      if (targetQueue.length === 1) { // If this is the first player, start the timer
        startQueueResetTimer(queueName);
      }
    } else {
      console.log(`${playerName} is already in the ${game} queue.`);
    }
  });

  socket.on("disconnectPlayer", () => {
    // Function to remove a player from a queue
    const removeFromQueue = (queue) => {
      const index = queue.findIndex((player) => player.id === socket.id);
      if (index !== -1) {
        queue.splice(index, 1);
        console.log(`Player removed from queue.`);
      }
    };

    // Check all queues for the disconnecting player
    removeFromQueue(valQueue);
    removeFromQueue(leagueQueue);
    removeFromQueue(overwatchQueue);
    removeFromQueue(cs2Queue);
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
