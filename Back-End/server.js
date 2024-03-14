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
    playersWaiting.push(playerName);
    console.log(`${playerName} wants to play a game`)

    if (playersWaiting.length >= 2) {
      const player1 = playersWaiting.shift();
      const player2 = playersWaiting.shift();

      io.to(player1).emit('matchFound', { opponent: player2 });
      io.to(player2).emit('matchFound', { opponent: player1 });
      socket.emit('matchFound', { opponent: player2 })

      console.log(player1, player2)
    }
  });
})

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