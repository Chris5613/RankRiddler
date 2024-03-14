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
    ], 
    methods: ["GET", "POST"],
    credentials: true
  }
});

const playersWaiting = [];

io.on('connection', (socket) => {
  socket.on('playGame', (data) => {
    const playerName = data.name;
    // Store both the player's name and their socket ID
    playersWaiting.push({ name: playerName, id: socket.id });
    console.log(`${playerName} wants to play a game`);

    if (playersWaiting.length >= 2) {
      const player1 = playersWaiting.shift();
      const player2 = playersWaiting.shift();

      // Emit 'matchFound' event to both players, using their socket IDs
      io.to(player1.id).emit('matchFound', { opponent: player2.name });
      io.to(player2.id).emit('matchFound', { opponent: player1.name });

      console.log(`${player1.name} and ${player2.name} are matched`);
    }
  });
});

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