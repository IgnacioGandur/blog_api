import { Router } from "express";
import authController from "../controllers/authController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

const authRouter = Router();

authRouter.route("/register").post(authController.registerPost);
authRouter.route("/login").post(authController.loginPost);
authRouter.route("/logout").all(authController.logout);

export default authRouter;
