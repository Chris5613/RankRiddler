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

class GameQueue {
  constructor(gameName) {
    this.gameName = gameName;
    this.queue = []; 
    this.playerMap = new Map(); 
    this.queueTimer = null; 
  }

  addPlayer(player) {
    if (this.playerMap.has(player.id)) {
      console.log(`${player.name} is already in the ${this.gameName} queue.`);
      return false;
    }
    this.queue.push(player);
    this.playerMap.set(player.id, player);
    console.log(`${player.name} has been added to the ${this.gameName} queue.`);
    this.startQueueResetTimer();
    return true;
  }

  removePlayer(playerId) {
    if (!this.playerMap.has(playerId)) {
      return false;
    }
    const player = this.playerMap.get(playerId);
    this.queue = this.queue.filter(p => p.id !== playerId);
    this.playerMap.delete(playerId);

    console.log(`${player.name} has been removed from the ${this.gameName} queue.`);
    if (this.queue.length > 0) {
      this.startQueueResetTimer();
    } else {
      this.stopQueueResetTimer();
    }
    return true;
  }

  matchPlayers() {
    while (this.queue.length >= 2) {
      const player1 = this.queue.shift();
      const player2 = this.queue.shift();
      this.playerMap.delete(player1.id);
      this.playerMap.delete(player2.id);

      io.to(player1.id).emit("matchFound", { opponent: player2.name, game: this.gameName });
      io.to(player2.id).emit("matchFound", { opponent: player1.name, game: this.gameName });
      console.log(`${player1.name} and ${player2.name} have been matched in ${this.gameName}.`);
    }
    if (this.queue.length === 0) {
      this.stopQueueResetTimer();
    } else {
      this.startQueueResetTimer();
    }
  }

  reset() {
    this.queue = [];
    this.playerMap.clear();
    console.log(`${this.gameName} queue has been reset.`);
  }

  startQueueResetTimer() {
    clearTimeout(this.queueTimer);
    this.queueTimer = setTimeout(() => {
      this.reset();
    }, 60000); 
  }

  stopQueueResetTimer() {
    clearTimeout(this.queueTimer);
  }
}

let queues = {
  valorant: new GameQueue('valorant'),
  league: new GameQueue('league'),
  overwatch: new GameQueue('overwatch'),
  cs2: new GameQueue('cs2')
};

io.on("connection", (socket) => {
  socket.on("playGame", (data) => {
    const { playerName, game } = data;
    const gameQueue = queues[game];
    if (!gameQueue) {
      console.log(`Game ${game} is not supported.`);
      return;
    }

    if (gameQueue.addPlayer({ name: playerName, id: socket.id })) {
      gameQueue.matchPlayers();
    }
  });

  socket.on("disconnectPlayerQueue", () => {
    Object.keys(queues).forEach(gameName => {
      if (queues[gameName].removePlayer(socket.id)) {
        queues[gameName].matchPlayers(); 
      }
    });
  });

  // socket.on("playerDisconnection", () => {
  //   console.log(`Player ${socket.id} has left the game.`);
    
  //   // Retrieve the game or queue the player is part of
  //   const gameDetails = findGameByPlayerId(socket.id); // Implement this function based on your application logic
    
  //   if (gameDetails) {
  //     // Determine and declare the winner
  //     const winnerId = determineWinner(gameDetails, socket.id); // Adjust implementation as needed
  //     io.to(winnerId).emit("gameOver", { winner: true });
      
  //   }
  // });
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
