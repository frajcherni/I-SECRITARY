const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Models
const Message = require("./models/messages");
const Request = require("./models/Requests");

// Controllers and Routes
const messageRoutes = require("./routes/messagesRoutes");
const requestRoutes = require("./routes/requestsRoutes");
const nodeMailerRoutes=require("./routes/nodemailerRoutes");
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/servicesRoutes');
const professionRoutes=require("./routes/professionsRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// route setup
messageRoutes(app, io);
requestRoutes(app, io);
nodeMailerRoutes(app);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('',professionRoutes);


// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});
