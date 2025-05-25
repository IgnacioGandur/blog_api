import { Router } from "express";
import postsController from "../controllers/postsController.js";
import checkIfUserIsAuthor from "../middleware/checkIfUserIsAuthor.js";
import validatePostCreation from "../middleware/validators/validatePostCreation.js";
import validatePartialPostUpdate from "../middleware/validators/validatePartialPostUpdate.js";
import validatePostDeletion from "../middleware/validators/validatePostDeletion.js";

const postsRouter = Router();

postsRouter
	.route("/")
	.post(
		checkIfUserIsAuthor,
		validatePostCreation,
		postsController.createPost
	);

postsRouter
	.route("/:postId")
	.all(checkIfUserIsAuthor)
	.patch(
		validatePartialPostUpdate,
		postsController.partialPostUpdate
	)
	.delete(
		validatePostDeletion,
		postsController.deletePost
	);

export default postsRouter;
