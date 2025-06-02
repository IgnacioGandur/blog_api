import authController from "../controllers/authController.js";

// Packages
import { Router } from "express";

// Validators
import validateUserRegister from "../middleware/validators/user/validateUserRegister.js";
import validateUserLogin from "../middleware/validators/user/validateUserLogin.js";

// Middleware
import redirectLoggedUser from "../middleware/redirectLoggedUsers.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

const authRouter = Router();

authRouter
	.route("/register")
	.post(
		redirectLoggedUser,
		validateUserRegister,
		authController.registerPost
	);

authRouter
	.route("/login")
	.post(
		redirectLoggedUser,
		validateUserLogin,
		authController.loginPost
	);

authRouter
	.route("/logout")
	.all(
		checkIfUserIsLogged,
		authController.logout
	);

export default authRouter;
