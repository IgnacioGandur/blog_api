import { Router } from "express";
import usersController from "../controllers/usersController.js";

// Validators
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateUserDeletion from "../middleware/validators/validateUserDeletion.js";
import validateUserAuthorUpdate from "../middleware/validators/validateUserAuthorUpdate.js"

const usersRouter = Router();

usersRouter
	.route("/")
	.delete(
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

usersRouter
	.route("/me/author")
	.patch(
		checkIfUserIsLogged,
		validateUserAuthorUpdate,
		usersController.partialUserUpdate
	);

export default usersRouter;
