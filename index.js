import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import {Server} from "socket.io";
import initializeChatModule from "./socket.js";
import Routes from "./Routes/Router.js";


const app=express();
const server=http.createServer(app);
const io=new Server(server);

const PORT=process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
// Middleware to attach io object to every request
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(Routes);


// initializeChatModule(io);
initializeChatModule(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


