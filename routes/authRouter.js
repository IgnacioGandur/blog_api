import { Router } from "express";
import authController from "../controllers/authController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

const authRouter = Router();

authRouter.route("/users/register").post(authController.registerPost);
authRouter.route("/users/login").post(authController.loginPost);
authRouter.route("/users/logout").all(authController.logout);
authRouter.route("/protected").all(checkIfUserIsLogged, (req, res) => {
	res.json({
		success: true,
		message: "Protected route reached successfully.",
	})
})


export default authRouter;
