import express from "express";

import User from "./UserRoute.js"
import Chat from "./ChatRoute.js"  

const router = express.Router();

router.use("/user", User);
router.use("/chat", Chat);


export default router;