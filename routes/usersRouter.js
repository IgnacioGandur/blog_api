import { Router } from "express";
import usersController from "../controllers/usersController.js";

// Validators
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";
import validateUserDeletion from "../middleware/validators/user/validateUserDeletion.js";
import validateUserAuthorUpdate from "../middleware/validators/user/validateUserAuthorUpdate.js";
import validateUserUpdate from "../middleware/validators/user/validateUserUpdate.js";

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
	.all(checkIfUserIsLogged)
	.get(
		usersController.getUser
	).patch(
		validateUserUpdate,
		usersController.partialUserUpdate
	)
	;

usersRouter
	.route("/me/author")
	.patch(
		checkIfUserIsLogged,
		validateUserAuthorUpdate,
		usersController.partialUserAuthorUpdate
	);

export default usersRouter;
