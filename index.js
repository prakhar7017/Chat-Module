import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import initializeChatModule from "./socket.js";
import { sequelize } from "./Configs/db.js";


const app=express();
const server=http.createServer(app);
const io=new Server(server);

const PORT=process.env.PORT || 3000;

// Middleware to attach io object to every request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// initializeChatModule(io);
initializeChatModule(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


