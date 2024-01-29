import express from "express";

import {
    RegisterUser,
    LoginUser,
    userDashboard,
    LogoutUser
} from "../Controllers/User/UserController.js"
import {isAuthenticated} from "../Middlewares/Auth.js"

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/dashboard",isAuthenticated,userDashboard);
router.post("/logout",LogoutUser);

export default router;