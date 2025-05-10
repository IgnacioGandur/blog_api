import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").post(authController.registerPost)

export default authRouter;
