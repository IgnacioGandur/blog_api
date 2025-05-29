import { Router } from "express";
import usersController from "../controllers/usersController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateUserDeletion from "../middleware/validators/validateUserDeletion.js";

const usersRouter = Router();

usersRouter.route("/").delete(
	checkIfUserIsLogged,
	validateUserDeletion,
	usersController.deleteUser
);

usersRouter
	.route("/me")
	.get(
		checkIfUserIsLogged,
		usersController.getUser
	);

export default usersRouter;
