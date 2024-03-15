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

io.on('connection', (socket) => {
  socket.on('playGame', (data) => {
    const playerName = data.name;
    // Log the incoming player
    console.log(`${playerName} wants to play a game`);

    // Add the player to the waiting list
    playersWaiting.push({ name: playerName, id: socket.id });

    // Check if we have at least two players waiting
    if (playersWaiting.length >= 2) {
      // Extract the first two players from the queue
      const [player1, player2] = playersWaiting.splice(0, 2);

      // Emit 'matchFound' event to both players
      io.to(player1.id).emit('matchFound', { opponent: player2.name });
      io.to(player2.id).emit('matchFound', { opponent: player1.name });

      // Log the match
      console.log(`${player1.name} and ${player2.name} are matched`);
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