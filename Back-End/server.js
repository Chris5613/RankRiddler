require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routers/users");
const formRoutes = require("./routers/form");
const cors = require("cors");
const path = require("path");
const http = require('http');
const socketIo = require('socket.io');
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
    credentials: true
  }
});

let playersWaiting = [];
let queueResetTimer = null;

const resetQueue = () => {
  console.log('Resetting queue due to insufficient players.');
  playersWaiting = []; // Clear the players waiting queue
};

const startQueueResetTimer = () => {
  // Check if a timer is already running, clear it first to avoid multiple timers
  if (queueResetTimer !== null) {
    clearTimeout(queueResetTimer);
  }

  // Set a new timer for 3 minutes (180000 milliseconds)
  queueResetTimer = setTimeout(() => {
    // Check if the queue has fewer than 2 players when the timer expires
    if (playersWaiting.length < 2) {
      resetQueue();
    }
    // After the action, clear the timer variable as it's no longer needed
    queueResetTimer = null;
  }, 60000); // 1 minutes in milliseconds
};

io.on('connection', (socket) => {
  socket.on('playGame', (data) => {
    const playerName = data.name;
    console.log(`${playerName} wants to play a game`);

    // Check if the player is already in the queue
    const isPlayerInQueue = playersWaiting.some(player => player.name === playerName);

    if (!isPlayerInQueue) {
      // Add the player to the waiting list if they're not already in it
      playersWaiting.push({ name: playerName, id: socket.id });
      console.log(`${playerName} added to the queue.`);

      // Start or reset the queue reset timer every time a new player joins
      startQueueResetTimer();
    } else {
      console.log(`${playerName} is already in the queue.`);
      // Optionally, send a message back to the player to inform them they're already in the queue
      io.to(socket.id).emit('alreadyInQueue', { message: 'You are already waiting in the queue.' });
    }

    // Check if we have at least two players waiting
    if (playersWaiting.length >= 2) {
      // Immediately match players without waiting for the timer if there are enough players
      // Also, stop the reset timer as it's not needed anymore
      if (queueResetTimer !== null) {
        clearTimeout(queueResetTimer);
        queueResetTimer = null;
      }

      const [player1, player2] = playersWaiting.splice(0, 2);

      // Emit 'matchFound' event to both players
      io.to(player1.id).emit('matchFound', { opponent: player2.name });
      io.to(player2.id).emit('matchFound', { opponent: player1.name });

      console.log(`${player1.name} and ${player2.name} are matched`);
    }
  });

  // Handle player disconnection
  socket.on('disconnectPlayer', () => {
    // Remove the disconnected player from the queue
    playersWaiting = playersWaiting.filter(player => player.id !== socket.id);

    console.log(`A player has disconnected. Updated queue length: ${playersWaiting.length}`);

    // If necessary, reset the queue timer here as well, based on your game's logic
    // This could depend on whether you want the timer to restart only when players actively join
  });
});



app.use(
  cors({
    origin: [
      "https://rr-front-end.onrender.com",
      "https://test-server-rr.onrender.com",
      "https://www.rankriddler.com",
      "http://localhost:3000",
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

const port = process.env.PORT || 3004;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});