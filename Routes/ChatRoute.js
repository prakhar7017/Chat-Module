import express from "express";

import {
    createChat,
    deleteOwnChats,
    updateChat
} from "../Controllers/Chat/ChatController.js"
import {isAuthenticated} from "../Middlewares/Auth.js"

const router = express.Router();

router.post("/create", createChat);
router.delete("/delete", deleteOwnChats);
router.put("/update", updateChat);
// router.post("/login", LoginUser);
// router.get("/dashboard",isAuthenticated,userDashboard);
// router.post("/logout",LogoutUser);

export default router;