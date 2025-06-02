import { Router } from "express";
import postLikesController from "../controllers/postLikesController.js";
import checkIfUserIsLogged from "../middleware/checkIfUserIsLogged.js";

// Validators
import validateLikeToPost from "../middleware/validators/likePost/validateLikeToPost.js";
import validateLikeToPostDeletion from "../middleware/validators/likePost/validateLikeToPostDeletion.js";

const postLikesRouter = Router({ mergeParams: true });

postLikesRouter
	.route("/")
	.post(
		checkIfUserIsLogged,
		validateLikeToPost,
		postLikesController.likePost
	)
	.delete(
		checkIfUserIsLogged,
		validateLikeToPostDeletion,
		postLikesController.removeLike
	);

export default postLikesRouter;
