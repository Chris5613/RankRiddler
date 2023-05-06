require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routers/users'); 
const cors = require('cors')

// server file
const app = express(); 
app.use(cors({
    origin: "*",
    headers: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

mongoose.connect(process.env.MONGO)
mongoose.connection.on('connected', () => {
    app.listen(process.env.PORT, () => console.log('DB connected and server is running on port', process.env.PORT));
})
mongoose.connection.on('error', err => {
    console.log('MongoDB connection error ' + err);
    process.exit();
});


app.use('/', userRoutes)